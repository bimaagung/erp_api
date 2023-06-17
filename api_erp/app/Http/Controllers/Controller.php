<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function success($data)
    {
        $response = [
            'meta' => [
                'success' => true,
                'code' => Response::HTTP_OK,
                'message' => 'OK',
            ],
            'data' => $data,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    protected function successWithPaginate($pagination, $data)
    {
        $response = [
            'meta' => [
                'success' => true,
                'code' => Response::HTTP_OK,
                'message' => 'OK',
            ],
            'data' => $data,
            'pagination' => $pagination,
        ];

        return response()->json($response, Response::HTTP_OK);
    }

    protected function fail($message)
    {
        $response = [
            'meta' => [
                'success' => false,
                'code' => Response::HTTP_BAD_REQUEST,
                'message' => $message,
            ]
        ];

        return response()->json($response, Response::HTTP_BAD_REQUEST);
    }

    protected function notFound($message)
    {
        $response = [
            'meta' => [
                'success' => false,
                'code' => Response::HTTP_NOT_FOUND,
                'message' => $message,
            ]
        ];

        return response()->json($response, Response::HTTP_NOT_FOUND);
    }

    protected function unauthorized()
    {
        $response = [
            'meta' => [
                'success' => false,
                'code' => Response::HTTP_UNAUTHORIZED,
                'message' => 'Unauthorized',
            ]
        ];

        return response()->json($response, Response::HTTP_UNAUTHORIZED);
    }
}
