<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSectionRequest;
use App\Http\Resources\SectionResource;
use App\Models\Section;
use App\Models\Task;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     */

    public function index($boardId)
    {
        return response()->json([
            'sections' => SectionResource::collection(Section::whereBoardId($boardId)->get()->loadMissing('tasks')),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     */
    public function create($boardId)
    {
     //
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request, $boardId)
    {
        $section = Section::create(['board_id' => $boardId, 'title' => 'Untitled']);

        return response()->json([
            'section' => $section
        ]);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($sectionId)
    {
        $section = Section::find((int)$sectionId)->loadMissing('tasks');

        return response()->json([
            'status' => 'success',
            'section' => new SectionResource($section)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Section $section
     * @return \Illuminate\Http\Response
     */
    public function edit(Section $section)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(UpdateSectionRequest $request, $sectionId)
    {
        $section = Section::find($sectionId);
        $newSection = $section->update($request->all());

        return response()->json([
            'status' => 'success',
            'section' => $newSection
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($sectionId)
    {
        Task::whereSectionId($sectionId)->delete();
        Section::destroy($sectionId);

        return response()->json([
            'status' => 'success'
        ]);
    }
}
