import { Component, Input, OnInit } from '@angular/core';

import { ICat } from 'src/app/models/cat.interface';

@Component({
  selector: 'app-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnInit {
  @Input() cat!: ICat;

  constructor() { }

  ngOnInit(): void {
  }

}
