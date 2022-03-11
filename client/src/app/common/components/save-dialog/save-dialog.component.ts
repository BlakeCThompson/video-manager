import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss']
})
export class SaveDialogComponent implements OnInit {
  @ViewChild('descriptionInput') descrInput!: ElementRef;
    @ViewChild('titleInput') titleInput!: ElementRef;
    @ViewChild('tagsInput') tagsInput!: ElementRef;
    @Input()
    videoId: number | undefined;
    videoTitle: string | undefined;
    videoDescription: string | undefined;
    videoTags: string | undefined;


  file: File | null = null;

  constructor(
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<SaveDialogComponent>
  ) {}

  ngOnInit(): void {}


  save() {

      // @ts-ignore
      let title : string = <HTMLInputElement>document.getElementById("file-name").value;
      // @ts-ignore
      let description: string  = <HTMLInputElement>document.getElementById("file-description").value;
      // @ts-ignore
      let tags : string = <HTMLInputElement>document.getElementById("file-tags").value;
      console.log(this.titleInput);
    this.uploadService.save(this.videoId,title,description,tags).subscribe((result: UserVideo) => {
      this.dialogRef.close(result);
    });
  }
}
