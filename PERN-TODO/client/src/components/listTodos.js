import React,{Fragment,useEffect,useState} from 'react'
import EditTodo from './editTodo';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './SearchBar';
import DeleteTodoModal from './DeleteTodoModal';


const ListTodos = () => {
    
    const [todos,setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5); 

    useEffect(() => {
      getTodos(currentPage);
  }, [currentPage]);

    const deleteTodo = async (id)=>{
        try {
            const token = localStorage.getItem('token');
          //   const token2 = Cookies.get('uid');
          //   Cookies.set('uid', token2, {
          //     httpOnly: true,
          //     sameSite: 'None',
          //     secure: false, // Set secure to true to ensure the cookie is only sent over HTTPS
          //     domain: 'localhost',
          //     path: '/',
          // });

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
            setFilteredTodos(filteredTodos.filter(todo => todo.todo_id !== id));
            
        } catch (err) {
            console.error(err.message);
            
        }

    }
    // const handleSearch = (searchTerm) => {
    //   const filtered = todos.filter(todo => todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
    //   setFilteredTodos(filtered);
    //   setCurrentPage(1);
    // };
    const handleSearch = async (searchTerm) => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
    
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
    
        if (searchTerm.trim() === '') {

          await getTodos(currentPage);
        } else {
          const response = await fetch(
            `http://localhost:5000/todos/search?searchTerm=${searchTerm}`,
            {
              credentials: 'include',
              headers: headers,
            }
          );
  
          const jsonData = await response.json();
          setFilteredTodos(jsonData);
          setCurrentPage(1); 
        }
    
      } catch (err) {
        console.error(err.message);
      }
    };
    const handleCheckboxChange = async (e, todo) => {
      const { checked } = e.target;
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
    
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
    
        const body = JSON.stringify({ completed: checked });
    
        const response = await fetch(`http://localhost:5000/todos/updateStatus/${todo.todo_id}`, {
          method: 'PUT',
          headers: headers,
          body: body,
        });
    
        if (response.ok) {
          getTodos(currentPage);
        } else {
          console.error('Failed to update completion status');
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    const getTodos = async (page) =>{
        try {

            const token = localStorage.getItem('token');

            const headers = {
              'Content-Type': 'application/json',
            };
            
            if (token) {
              headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch(`http://localhost:5000/todos?page=${page}&limit=${recordsPerPage}`,{
              credentials: 'include',
              headers:headers,
            });
            const jsonData = await response.json();
            setTodos(jsonData.todos);
            setFilteredTodos(jsonData.todos);
            setTotalPages(jsonData.totalPages);

            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    // For pageneation
    // const [currentPage,setCurrentPage]= useState(1);
    // const recordsPerPage = 5;
    // const lastIndex = currentPage*recordsPerPage;
    // const firstIndex = lastIndex - recordsPerPage;
    // const records = filteredTodos.slice(firstIndex,lastIndex);
    // const npage = Math.ceil(filteredTodos.length / recordsPerPage);
    // const numbers = [...Array(npage + 1).keys()].slice(1);
    
  return <Fragment>
  <div className='justify-content-center'>
  <SearchBar handleSearch={handleSearch} />
  </div>
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Status</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {console.log(filteredTodos)}
      {
        
        filteredTodos.map((todo) =>(
            <tr key={todo.todo_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => handleCheckboxChange(e, todo)}
                  />
                </td>
                <td className={ todo.completed ? 'completed' : ''}>{todo.description}</td>
                <td><EditTodo todo = {todo} /></td>
                {/* <td><button className='btn btn-danger' onClick={()=>{deleteTodo(todo.todo_id)}} >Delete</button></td> */}
                <td><DeleteTodoModal todo={todo} deleteTodo={deleteTodo} /></td>
            </tr>
        ))
        
      }
      
    </tbody>
  </table>
  <nav>
    <ul className='pagination justify-content-center'>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className='page-link' onClick={prePage}>Prev</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className='page-link' onClick={() => changeCpage(index + 1)}>{index + 1}</button>
            </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className='page-link' onClick={nextPage}>Next</button>
        </li>
    </ul>
</nav>

  </Fragment>;

  function nextPage(){
    if(currentPage < totalPages){
      setCurrentPage(currentPage+1);
    }

  }
  function prePage(){
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }

  }
  function changeCpage(id){
    setCurrentPage(id);

  }
}

export default ListTodos