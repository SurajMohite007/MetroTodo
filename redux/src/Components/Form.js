import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux';
// import { addTodo } from '../Redx/todoapp/reducers/operations';
import { addTodo , handleEditSubmit } from '../Redx/todoapp/actions';

export const Form = ({editFormVis , editTodo , cancelUpdate}) => {
    const dispatch = useDispatch();
    const [todoValue,setTodoValue] = useState('');
    const [editValue,setEditValue] = useState('');
    useEffect(()=>{
        setEditValue(editTodo.todo)
    },[editTodo])
    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj= {
            id: time,
            todo:todoValue,
            completed: false
        }
        setTodoValue('');
        dispatch(addTodo(todoObj))

    }
    const editSubmit = (e) =>{
        e.preventDefault();
        let editedObj = {
            id : editTodo.id,
            todo : editValue,
            completed : false

        }
        dispatch(handleEditSubmit(editedObj));
    }
  return (
    <>
        {editFormVis===false ? (<form className='form-group custom-form' onSubmit={handleSubmit}>
      <label>Add your todo-items</label>
      <div className='input-and-btn'>
        <input type="text" className='form-control' required
          value={todoValue} onChange={(e)=>setTodoValue(e.target.value)}/>
        <button type="submit" className='btn btn-secondary btn-md'>ADD</button>
      </div>
    </form>):(
        <form className='form-group custom-form' onSubmit={editSubmit}>
        <label>Update your todo-items</label>
        <div className='input-and-btn'>
          <input type="text" className='form-control' required
          value={editValue|| ""} onChange={(e) =>setEditValue(e.target.value)}/>
          <button type="submit" className='btn btn-secondary btn-md'>UPDATE</button>
        </div>
        <button type='button' className='btn btn-primary btn-md back-btn' onClick={cancelUpdate}>BACK</button>
      </form>
    ) }
    
    
    </>
    
  )
}
