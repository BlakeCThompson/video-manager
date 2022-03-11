<?php

namespace Tests\Feature;

use App\Models\Video;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;

class VideoControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_videos_with_empty_db ()
    {
        $response = $this->get('/api/video');
        $response
            ->assertStatus(200)
            ->assertJson([]);
    }

    public function test_add_video ()
    {
        Storage::fake('public');
        $mp4 = UploadedFile::fake()->create('my-video.mp4', 1356, 'video/mp4');
        $response = $this->post('/api/video', [
            'video' => $mp4
        ]);

        /** @var Video $video */
        $video = $response->baseResponse->original;

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'id','path'
        ]);
        $this->assertNotNull($video);
        Storage::assertExists($video->path);
        Mockery::close();
    }

    public function test_get_videos ()
    {
        Video::factory()->count(3)->create();

        $response = $this->get('/api/video');

        $response
            ->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_get_single_video ()
    {
        $video = Video::factory()->create();
        $response = $this->get("/api/video/{$video->getKey()}");
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                    'id', 'path'
            ]);
    }

    public function test_update_video ()
    {
        $video = Video::factory()->create(['title'=>'firstTitle']);
        $newTitle = 'secondTitle';
        $response = $this->patch("/api/video/{$video->getKey()}",['title'=>$newTitle]);

        $response
            ->assertStatus(200)
            ->assertJson(['title'=>$newTitle]);
        $video->refresh();
        self::assertEquals($video->title, $newTitle);
    }

}
