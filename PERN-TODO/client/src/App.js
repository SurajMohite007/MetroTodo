
import './App.css';
import React,{Fragment} from 'react';
import InputTodo from './components/inputTodo';
import ListTodos from './components/listTodos';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';





function App() {
  
  return (
    <Fragment>
    <BrowserRouter>
    <Routes>
      <Route path='/' element=<Login />></Route>
      <Route path='/signup' element=<SignUp />></Route>
      <Route path='/app' element=<AppLayout />></Route>
    </Routes>
    
    
    </BrowserRouter>
    </Fragment>
  );
}

function AppLayout() {
  return (
    <div className="container">
      <InputTodo />
      <ListTodos />
    </div>
  );
}


export default App;
