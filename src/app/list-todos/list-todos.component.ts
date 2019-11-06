import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos = [
      {
        id: 1, 
        description: 'ttest1'
      },
      {
        id: 2, 
        description: 'ttest2'
      },
      {
        id: 3, 
        description: 'ttest3'
      }
  ]

  constructor() { }

  ngOnInit() {
  }

}
