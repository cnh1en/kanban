<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'prefix' => 'auth',
    'middleware' => 'api'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('refresh', [AuthController::class, 'refresh']);
});


Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('boards', [BoardController::class, 'index']);
    Route::patch('boards/favourite', [BoardController::class, 'updateFavouritePosition']);
    Route::get('boards/favourite', [BoardController::class, 'getFavouriteBoards']);
    Route::get('boards/{boardId}', [BoardController::class, 'show']);

    Route::post('boards', [BoardController::class, 'create']);

    Route::patch('boards/{boardId}', [BoardController::class, 'update']);
    Route::patch('boards', [BoardController::class, 'updatePosition']);

    Route::delete('boards/{boardId}', [BoardController::class, 'delete']);
});

Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('sections/{boardId}', [SectionController::class, 'index']);

    Route::post('sections/{boardId}', [SectionController::class, 'store']);

    Route::delete('sections/{sectionId}', [SectionController::class, 'destroy']);

    Route::patch('sections/{sectionId}', [SectionController::class, 'update']);
});

Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::patch('tasks/update-position', [TaskController::class, 'updatePosition']);

    Route::post('tasks/{sectionId}', [TaskController::class, 'store']);

    Route::patch('tasks/{taskID}', [TaskController::class, 'update']);

    Route::delete('tasks/{taskId}', [TaskController::class, 'destroy']);

});

