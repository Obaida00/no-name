<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $headerLocale = $request->header('Accept-Language', session('locale', config('app.locale')));

        $primaryLocale = $this->getPrimaryLocale($headerLocale);

        $locale = $this->validateLocale($primaryLocale);

        Log::debug('Locale transformation', [
            'original' => $headerLocale,
            'primary' => $primaryLocale,
            'validated' => $locale
        ]);

        try {
            App::setLocale($locale);
            session(['locale' => $locale]);
        } catch (\Exception $e) {
            Log::error('Error setting locale: ' . $e->getMessage());
            App::setLocale(config('app.fallback_locale'));
            session(['locale' => config('app.locale')]);
        }

        return $next($request);
    }

    protected function getPrimaryLocale(string $header): string
    {
        if (str_contains($header, ',')) {
            $parts = explode(',', $header);
            $header = trim($parts[0]);
        }

        if (str_contains($header, ';')) {
            $parts = explode(';', $header);
            $header = trim($parts[0]);
        }

        return str_replace('-', '_', $header);
    }

    protected function validateLocale(string $locale): string
    {
        if (empty($locale)) {
            return config('app.locale');
        }

        try {
            $availableLocales = [];

            $langPath = resource_path('lang');
            if (File::exists($langPath)) {
                if (File::isDirectory($langPath)) {
                    $availableLocales = collect(File::directories($langPath))
                        ->map(fn($dir) => basename($dir))
                        ->toArray();
                }

                $jsonLocales = collect(File::files($langPath))
                    ->filter(fn($file) => $file->getExtension() === 'json')
                    ->map(fn($file) => pathinfo($file->getFilename(), PATHINFO_FILENAME))
                    ->toArray();

                $availableLocales = array_merge($availableLocales, $jsonLocales);
            }

            $availableLocales[] = 'en';
            $availableLocales = array_unique($availableLocales);

            if (in_array($locale, $availableLocales)) {
                return $locale;
            }

            $parts = explode('_', $locale);
            $baseLocale = $parts[0];
            if (in_array($baseLocale, $availableLocales)) {
                return $baseLocale;
            }

            return config('app.locale');
        } catch (\Exception $e) {
            Log::error('Error validating locale: ' . $e->getMessage());
            return config('app.locale');
        }
    }
}
