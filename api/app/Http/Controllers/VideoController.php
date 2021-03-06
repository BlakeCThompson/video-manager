<?php

namespace App\Http\Controllers;

use App\Http\Resources\VideoResource;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class VideoController extends Controller
{
    public function getVideo (Video $video): VideoResource
    {
        return VideoResource::make($video);
    }

    public function getAllVideos ()
    {
        return VideoResource::collection(Video::all());
    }

    public function saveVideo (Request $req)
    {
        $validator = Validator::make($req->all(), [
            'video' => 'required|max:50000'
        ]);
        if ($validator->fails()) {
            return response(['video exceeds max size of 50MB.'],422);
        }
        $tags = $this->formatTags($req->input('tags'));

        $videoData = array_merge(['tags'=>$tags],$req->only('file','title','description'));
        $videoData['path'] = Storage::putFile('storage', $req->file('video'));
        return VideoResource::make(Video::create($videoData));
    }

    public function editVideo (Video $video, Request $req) {
        $tags = $this->formatTags($req->input('tags'));

        $videoData = array_merge(['tags'=>$tags],$req->only('title','description'));
        $video->update($videoData);
        $video->save();
        return VideoResource::make(($video));
    }

    private function formatTags($tags) {
        if (empty($tags)) {
            return [];
        }

        if (is_array($tags)) {
            return $tags;
        }
        return explode(' ', $tags);
    }

}
