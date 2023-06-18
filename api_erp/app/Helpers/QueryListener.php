<?php

namespace App\Helpers;

use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\Log;

class QueryListener
{
    public function handle(QueryExecuted $event)
    {
        $sql = $event->sql;
        $bindings = $event->bindings;
        $time = $event->time;

        Log::info('Query: ' . $sql . ', Bindings: ' . json_encode($bindings) . ', Execution Time: ' . $time . 'ms');
    }
}
