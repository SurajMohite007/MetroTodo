import './App.css';
import { Form } from './Components/Form';
import { useState } from 'react';
import { Todo } from './Components/Todo';
import { useDispatch } from 'react-redux';
import { deleteAll } from './Redx/todoapp/actions';
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [editFormVis,setEditFormVis] = useState(false);
  const [editTodo,setEditTodo] = useState('');
  const todos = useSelector((state) => state.operationsReducer);
  const handleEditClick = (todo)=>{
    setEditFormVis(true);
    setEditTodo(todo);
  }
  const cancelUpdate = () =>{
    setEditFormVis(false);
  }
  return (
    <div className="App">
      <Form editFormVis={editFormVis} editTodo={editTodo} cancelUpdate={cancelUpdate}/>
      <Todo handleEditClick= {handleEditClick} editFormVis={editFormVis}/>
      {todos.length > 0 && (<button className='btn btn-danger btn-md delete-all' onClick={()=>dispatch(deleteAll())}>DELETE ALL</button>)
      }
      
    </div>
  );
}

export default App;
