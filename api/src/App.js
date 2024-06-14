
import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos,setTodos] = useState([]);

  useEffect(
    ()=>{
      const getTodos = async () => {
        const {data:res} = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        setTodos(res);
      }
      getTodos();
      
    }
    ,[]);
    const deleteTodo = (id) =>{
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then( response =>{
        setTodos(todos.filter((todo) => todo.id !== id));
      }).catch(error => { console.log('Error occured while deleting the Todo-> ',error)});
      
    }

    const addTodo = (todoObj) => {
      axios.post('https://jsonplaceholder.typicode.com/todos',todoObj).then((response) => setTodos([...todos,todoObj]) )
      .catch(err => { console.log("Error occured while adding a Todo -> ",err)});
      
    }

    const updateCheckbox = (id, changedVal) =>{
      axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,changedVal).then( response =>{
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo )));
      }).catch(error => { console.log('Error occured while checking or unchecking the Todo-> ',error)});
      

    }

    const updateTodo = (id,changedTodo) => {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`,changedTodo).then( response =>{
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo )));
      }).catch(error => { console.log('Error occured while updating the Todo-> ',error)});

    }
  return (
    <div className="App">
      <Form addTodo={addTodo}  />
      <Todo todos ={todos} deleteTodo={deleteTodo} updateCheckbox={updateCheckbox}   updateTodo={updateTodo} />
    </div>
  );
}

export default App;
