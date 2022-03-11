import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserVideo } from './user-video';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) { }

  getVideos(): Observable<UserVideo[]> {
    return this.http.get<UserVideo[]>(`${environment.apiBaseUrl}/video`);
  }

  upload(file: File,title:string,description:string,tags:string): Observable<UserVideo> {
    const formData = new FormData()
      console.log(title);
    formData.append('video', file, file.name);
    formData.append('title',title);
    formData.append('description',description);
    formData.append('tags',tags);
    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.post<UserVideo>(`${environment.apiBaseUrl}/video`, formData, {headers});
  }

    save(id: number | undefined, title: string, description: string, tags: string): Observable<UserVideo> {
      let formData: {[key:string]:string} = {
          'title' : title,
          'description': description,
          'tags' : tags
      };
      console.log(title);

      const headers = new HttpHeaders()
          .set('Accept', 'application/json');

      return this.http.patch<UserVideo>(`${environment.apiBaseUrl}/video/${id}`, formData, {headers});
  }
}
