import React, { useState } from 'react'
import { Icon } from 'react-icons-kit';
import {trash} from 'react-icons-kit/feather/trash'
import {edit2} from 'react-icons-kit/feather/edit2'

const Todo = ({todos,deleteTodo,updateCheckbox,updateTodo}) => {

    const handleToggle = (todo)=>{

        updateCheckbox(todo.id,{...todo,completed: !todo.completed});

    }

const [editingId,setEditingId] = useState(null);
const [newTitle,setNewTitle] = useState('');

const handleEditClick = (todo) =>{
    setEditingId(todo.id);
    setNewTitle(todo.title);
}

const handleSaveClick = (todo)=>{
    if(newTitle.trim()){
        updateTodo(todo.id, {...todo,title:newTitle});
        setEditingId(null);
    }
}
    
return  todos.map((todo)=>(
    <div key={todo.id} className='todo-box'>
        <div className='content'>
            
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo)}></input>
            {editingId === todo.id ? (
                <input type="text" className='form-control' required
          value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
        ):(
                <p style={todo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
                {todo.title}
            </p>)}
            
        </div>

        <div className='actions-box'>

            {editingId === todo.id ? (<button className='btn btn-secondary btn-md' onClick={()=> handleSaveClick(todo)}>SAVE</button>):(
                <>
                <span onClick={()=> {handleEditClick(todo)}} ><Icon icon={edit2}/></span>
            <span onClick={() => deleteTodo(todo.id)} ><Icon icon={trash}/></span></>)} 
          
        </div>
    </div>))
}

export default Todo