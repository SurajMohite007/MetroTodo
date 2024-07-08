import React,{Fragment,useEffect,useState} from 'react'
import EditTodo from './editTodo';


const ListTodos = () => {

    const [todos,setTodos] = useState([]);

    const deleteTodo = async (id)=>{
        try {
            const token = localStorage.getItem('token');

            const headers = {
              'Content-Type': 'application/json',
            };
            
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE",
                credentials: 'include',
                headers:headers,
            });
            
            setTodos(todos.filter(todo => todo.todo_id !== id));
            
        } catch (err) {
            console.error(err.message);
            
        }

    }
    const getTodos = async () =>{
        try {

            const token = localStorage.getItem('token');

            const headers = {
              'Content-Type': 'application/json',
            };
            
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch("http://localhost:5000/todos",{
              credentials: 'include',
              headers:headers,
            });
            const jsonData = await response.json();
            setTodos(jsonData);
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    useEffect(()=>{
        getTodos();
    },[]);
    
  return <Fragment>
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr> */}
      {
        todos.map((todo) =>(
            <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo = {todo} /></td>
                <td><button className='btn btn-danger' onClick={()=>{deleteTodo(todo.todo_id)}} >Delete</button></td>
            </tr>
        ))
      }
    </tbody>
  </table>

  </Fragment>;
}

export default ListTodos