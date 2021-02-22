import { Component, Input, OnInit } from '@angular/core';
import { Photos } from 'src/app/interfaces/photo';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  @Input() picture:Photos;
  constructor() { }

  ngOnInit(): void {
  }

}
