import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../services/upload/upload.service';
import { UserVideo } from '../../services/upload/user-video';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('descriptionInput') descrInput!: ElementRef;
    @ViewChild('titleInput') titleInput!: ElementRef;
    @ViewChild('tagsInput') tagsInput!: ElementRef;
  file: File | null = null;

  constructor(
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<UploadDialogComponent>
  ) {}

  ngOnInit(): void {}

  selectFile() {
    this.fileInput.nativeElement.click();

  }

  fileChange(event: Event) {
    const files: FileList = (event as any).target?.files;
    if(files.length > 0) {
      this.file = files[0];
    }
  }

  upload() {
      // @ts-ignore
      let title : string = <HTMLInputElement>document.getElementById("file-name").value;
      // @ts-ignore
      let description: string  = <HTMLInputElement>document.getElementById("file-description").value;
      // @ts-ignore
      let tags : string = <HTMLInputElement>document.getElementById("file-tags").value;
      if(!this.file) return
      console.log(this.titleInput);
    this.uploadService.upload(this.file!,title,description,tags).subscribe((result: UserVideo) => {
      this.dialogRef.close(result);
    });
  }
}
