<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Str;

class AuthController extends Controller
{
    /**
     * @response UserResource
     */
    public function currentUser(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * @response array{token: string, user: UserResource}
     * @unauthenticated
     */
    public function register(Request $request)
    {
        $request->merge([
            'password_confirmation' => $request->input('passwordConfirmation')
        ]);
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'passwordConfirmation' => 'required',
            /** @ignoreParam */
            'password_confirmation' => ''
        ], [
            'name.required' => __('validation.custom.name.required'),
            'name.max' => __('validation.custom.name.max'),
            'email.required' => __('validation.custom.email.required'),
            'email.email' => __('validation.custom.email.email'),
            'email.unique' => __('validation.custom.email.unique'),
            'password.required' => __('validation.custom.password.required'),
            'password.confirmed' => __('validation.custom.password.confirmed'),
            'passwordConfirmation.required' => __('validation.custom.passwordConfirmation.required'),
        ]);

        $user = User::create($data);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    /**
     * @response array{token: string, user: UserResource}
     * @unauthenticated
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => __('validation.custom.email.required'),
            'email.email' => __('validation.custom.email.email'),
            'password.required' => __('validation.custom.password.required'),
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'message' => __('IncorrectEmailOrPassword')
            ], 422);
        }

        $user = Auth::user();

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    /**
     * @response array{token: string, user: UserResource}
     * @unauthenticated
     */
    public function handleSocialLogin(Request $request)
    {
        $provider = $request->input('provider');
        $token = $request->input('token');

        if ($provider === 'google') {
            try {
                $socialUser = Socialite::driver('google')->userFromToken($token);
            } catch (\Exception $e) {
                return response()->json(['error' => __('InvalidGoogleToken')], 401);
            }
        } elseif ($provider === 'github') {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ])->get('https://api.github.com/user');
                if ($response->failed()) {
                    return response()->json(['error' => __('InvalidGitHubToken')], 401);
                }

                $userData = $response->json();
                if ($userData['email'] == null) {
                    $emailResponse = Http::withHeaders([
                        'Authorization' => 'Bearer ' . $token,
                        'Accept' => 'application/json',
                    ])->get('https://api.github.com/user/emails');
                    $emails = $emailResponse->json();
                    $userData['email'] = $emails[0]['email'] ?? null;
                }
                $socialUser = (object) [
                    'id' => $userData['id'],
                    'name' => $userData['name'] ?? $userData['login'],
                    'email' => $userData['email'],
                ];
            } catch (\Exception $e) {
                return response()->json(['error' => __('ErrorVerifyingGitHubToken')], 500);
            }
        } else {
            return response()->json(['error' => __('UnsupportedProvider')], 400);
        }

        if ($socialUser->email == null) {
            return response()->json(['message' => __('ValidEmailAddressIsRequired')], 422);
        }

        $user = User::where('provider', $provider)
            ->where('provider_id', $socialUser->id)
            ->first();

        if (!$user) {
            $existingUser = User::where('email', $socialUser->email)->first();
            if ($existingUser) {
                $existingUser->provider = $provider;
                $existingUser->provider_id = $socialUser->id;
                $existingUser->save();
                $user = $existingUser;
            } else {
                $user = User::create([
                    'name' => $socialUser->name,
                    'email' => $socialUser->email,
                    'provider' => $provider,
                    'provider_id' => $socialUser->id,
                    'password' => Hash::make(Str::random(16)),
                ]);
            }
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'token' => $token,
            'user' => new UserResource($user)
        ]);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'message' => __('SuccessfullyLoggedOut')
        ]);
    }
}
