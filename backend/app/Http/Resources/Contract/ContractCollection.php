<?php

namespace App\Http\Resources\Contract;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ContractCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => $this->collection,
        ];
    }

    public function with($request)
    {
        $pagination = $this->resource->toArray();

        unset($pagination['data']);

        if (isset($pagination['links']) && is_array($pagination['links'])) {
            $queryParams = $request->query();
            unset($queryParams['page']);

            $queryString = http_build_query($queryParams);

            if (!empty($queryString)) {
                foreach ($pagination['links'] as &$link) {
                    if ($link['url']) {
                        $link['url'] .= (parse_url($link['url'], PHP_URL_QUERY) ? '&' : '?') . $queryString;
                    }
                }
            }
        }

        return $pagination;
    }
}
