<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBoardRequest;
use App\Http\Requests\UpdateBoardRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */
    public function index()
    {
        return response()->json([
            'boards' => BoardResource::collection(Board::orderBy('position')->get()->loadMissing('sections')->loadMissing('tasks'))
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create(Request $request)
    {
        $length = Board::where(['user_id' => auth()->user()->id])->count();


        $board = Board::create([
            'user_id' => auth()->user()->id,
            'icon' => '📄',
            'title' => 'Untitled',
            'position' => -($length + 1),
            'description' => "Hello Laravel",
            'favourite_position' => -($length + 1),
            ...$request->all()

        ]);
        return response()->json([
            'board' => $board,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(StoreBoardRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($boardId)
    {
        return response()->json([
            'board' => new BoardResource(Board::find($boardId)->loadMissing('sections')->loadMissing('tasks'))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(Request $request, $boardId)
    {
        $board = Board::find($boardId);
        $board->update($request->all());

        return response()->json([
            'status' => 'success',
        ]);
    }


    public function updatePosition(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $board) {
            $id = $board['id'];
            Board::whereId($id)->update([
                'position' => $key
            ]);
        }

        return response()->json([
            'status' => 'success',
            'test' => $data
        ]);
    }

    public function updateFavouritePosition(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $board) {
            $id = $board['id'];
            Board::whereId($id)->update([
                'favourite_position' => $key
            ]);
        }

        return response()->json([
            'status' => 'success',
            'test' => $data
        ]);
    }

    public function getFavouriteBoards(Request $request)
    {
        return response()->json([
            'boards' => Board::where([
                'user_id' => auth()->user()->id,
                'favourite' =>
                    true
            ])->orderBy('favourite_position')->get()
        ]);
    }

    public function delete(Request $request, $boardId)
    {
        $sections = Section::where([
            'board_id' => $boardId
        ])->get();

        foreach ($sections as $section) {
            Task::where(['section_id' => $section['id']])->delete();
        }
        Section::where(['board_id' => $boardId])->delete();
        Board::find(['id' => $boardId])->each->delete();
        /*
         * Model::find(...) return instance
         * Model::where(...)->first() return instance
         * Model::first() return instance
         * Model::where(...)->get() return collection
         * Model::find([...]) return collection
         * Model::all() return collection
         * */
        return response()->json([
            'status' => 'success',
        ]);
    }

}
