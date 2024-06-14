import React from 'react'
import { useState } from 'react';


const Form = ({addTodo}) => {
    const [todoValue,setTodoValue] = useState('');
    // let todoObj= {
    //     id: 201,
    //     title:todoValue,
    //     completed: false,
    //     userId: 1
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj= {
            id: time,
            title:todoValue,
            completed: false,
            userId: 7
        }

        addTodo(todoObj);
        setTodoValue('');      
    }
  return (
    <div>
        <form className='form-group custom-form' onSubmit={handleSubmit}>
      <label>Add your todo-items</label>
      <div className='input-and-btn'>
        <input type="text" className='form-control' required
          value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
        <button type="submit" className='btn btn-success btn-md'>ADD</button>
      </div>
    </form>
    </div>
  )
}

export default Form