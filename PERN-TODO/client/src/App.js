
import './App.css';
import React,{Fragment,useState} from 'react';
import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';





function App() {

  const [todosUpdated, setTodosUpdated] = useState(false);

  
  const handleTodoAdded = () => {
    setTodosUpdated(prev => !prev); 
  };
  
  return (
    <Fragment>
    <BrowserRouter>
    <Routes>
      <Route path='/' element=<Login />></Route>
      <Route path='/signup' element=<SignUp />></Route>
      <Route path='/app' element=<AppLayout onTodoAdded={handleTodoAdded} todosUpdated={todosUpdated} />></Route>
    </Routes>
    
    
    </BrowserRouter>
    </Fragment>
  );
}

function AppLayout({ onTodoAdded, todosUpdated }) {
  return (
    <div className="container">
      <InputTodo onTodoAdded={onTodoAdded} />
      <ListTodos trigger={todosUpdated}/>
    </div>
  );
}


export default App;
