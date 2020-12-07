import { Component, OnInit } from '@angular/core';
import {ClassifierService} from '../classifier.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less']
})
export class UploadFileComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  selectedEvent: Event;
  progress = 0;
  message = '';

  selectFile(event: Event): void {
    this.selectedFiles = (event.target as HTMLInputElement).files;
    this.selectedEvent = event;
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);

    const reader = new FileReader();

    let imgTag = (document.getElementById('input image') as HTMLImageElement);
    imgTag.title = this.currentFile.name;

    reader.onload = event => {
      imgTag.src = (event.target.result as string);
    };

    reader.readAsDataURL(this.currentFile);

    imgTag = (document.getElementById('input image') as HTMLImageElement);

    this.classifierService.classify(imgTag).then(r => {
      const label = this.classifierService.convert(r as Float32Array);
      console.log(label);
    });
  }

  constructor(private classifierService: ClassifierService) { }

  ngOnInit(): void {
  }

}
