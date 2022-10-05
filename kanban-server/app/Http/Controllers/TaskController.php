<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdatePositionTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     */

    public function store($sectionId)
    {
        $task = Task::create([
            'section_id' => $sectionId,
            'position' => Task::whereSectionId($sectionId)->count(),
            'title' => 'Untitled',
            'content' => 'Untitled'
        ]);

        return response()->json([
            'status' => 'success',
            'task' => new TaskResource($task)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(UpdateTaskRequest $request, $taskId)
    {
        Task::find($taskId)->update($request->all());

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($taskId)
    {
        $currentTask = Task::find($taskId);
        $sectionId = $currentTask->section_id;

        $currentTask->delete();

        $tasks = Task::whereSectionId($sectionId)->get();

        foreach ($tasks as $key => $task) {
            $task->update(['position' => $key]);
        }

        return response()->json([
            'status' => 'success'
        ]);
    }

    public function updatePosition(UpdatePositionTaskRequest $request)
    {

        $resourceList = $request['resourceList'];
        $destinationList = $request['destinationList'];
        $resourceSectionId = $request['resourceSectionId'];
        $destinationSectionId = $request['destinationSectionId'];

        if ($resourceSectionId !== $destinationSectionId) {
            foreach ($resourceList as $key => $item) {
                Task::find($item['id'])->update([
                    'section_id' => $resourceSectionId,
                    'position' => $key
                ]);
            }

            foreach ($destinationList as $key => $item) {
                Task::find($item['id'])->update([
                    'section_id' => $destinationSectionId,
                    'position' => $key
                ]);
            }
        } else {
            foreach ($destinationList as $key => $item) {
                Task::find($item['id'])->update([
                    'section_id' => $destinationSectionId,
                    'position' => $key

                ]);
            }
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
}
