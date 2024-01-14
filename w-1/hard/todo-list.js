/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(arr=[]){
    this.arr = arr;
  }
  add(x){
    this.arr.push(x);
  }
  remove(it){
    if(it < this.arr.length){
      it += 1;
      while(it < this.arr.length){
        let temp = this.arr[it];
        this.arr[it] = this.arr[it-1];
        this.arr[it-1] = temp;
        it+= 1;
      }
      this.arr.pop();
    }
  }
  update(it , update){
    if(it < this.arr.length){
      this.arr[it] = update;
    }
  }
  getAll(){
    return (this.arr);
  }
  get(it){
    if(it < this.arr.length){
      return (this.arr[it]);
    }
    return null;
  }
  clear(){
    this.arr.length = 0;
  }
}

module.exports = Todo;
