<?php

use App\Http\Controllers\VideoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('video/{video}', [VideoController::class, 'getVideo']);
Route::get('video', [VideoController::class, 'getAllVideos']);
Route::post('video', [VideoController::class, 'saveVideo']);
Route::patch('video/{video}', [VideoController::class, 'editVideo']);
