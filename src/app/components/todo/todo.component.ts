import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() tagName: string;
  @Input() data: any[];

  constructor() { }

  ngOnInit(): void {
  }

}