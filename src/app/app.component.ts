import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Todo } from './todo';
import { FormsModule } from '@angular/forms';
import { style } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TodoApp';


  todos: Array<Todo>=[]
  newTodo: Todo=new Todo
  newTag: string=``;
  todoTypes: Array<any> =[
    {text: `primary`, value: `alert-primary`},
    {text: `danger`, value: `alert-danger`},
    {text: `warning`, value: `alert-warning`},
    {text: `success`, value: `alert-success`}
  ]

  todoTags: Array<any>=[
     "new", "urgent", "pending", "personal", "work"
  ]


  constructor(){
    this.fetchData()
  }

  addNewTag(){
    if (this.newTag!=``) 
    {this.todoTags.push(this.newTag)

      //reset
      this.newTag=``}
      
    
  }


  addNewTodo() {
     this.newTodo.id=(Math.floor(Math.random()*Date.now())).toString()
     this.todos.push(this.newTodo)

     //reset
     this.newTodo= new Todo
  }

  deleteToDo(toDoItem: Todo){
     let index= this.todos.findIndex(x=>x.id===toDoItem.id)
     this.todos.splice(index, 1)
  }
  CounterByNum(): string
  {
    let badgeClass: string;

    switch (true) {
      case this.todos.length > 10:
        badgeClass = 'badge-danger';
        break;
        case this.todos.length > 5:
        badgeClass = 'badge-warning';
        break;
      default:
        badgeClass = 'badge-success';
        break;      
    }

    return badgeClass;
  }

  counter() : number
  {
    return this.todos.length
  }

  styleBinding(todoItem: Todo) : string{
      return todoItem.type
  }
  async fetchData() {
    const url = 'https://gist.githubusercontent.com/siposm/86860e30a000a5dca4b0855f7644bcf2/raw/39c5c3947ee5469532bd7d6ddea6b54e58acd3c0/todos.json'
    let todoObjects = (await (await fetch(url)).json()).todos

    console.log(todoObjects)

    // use this to have ToDo objects instead of {} objects
    todoObjects.map((x: any) => {
      let t = new Todo()
      t.id = x.id
      t.text = x.text
      t.type = x.type
      t.tags = x.tags
      this.todos.push(t)
    })
      
  }
}
