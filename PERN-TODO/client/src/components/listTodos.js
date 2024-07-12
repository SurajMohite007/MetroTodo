import React,{Fragment,useEffect,useState} from 'react'
import EditTodo from './editTodo';
import 'bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './SearchBar';


const ListTodos = () => {
    
    const [todos,setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);

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
    const handleSearch = (searchTerm) => {
      const filtered = todos.filter(todo => todo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredTodos(filtered);
      setCurrentPage(1);
    };
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
            setFilteredTodos(jsonData);
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    useEffect(()=>{
        getTodos();
    },[]);

    // For pageneation
    const [currentPage,setCurrentPage]= useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage*recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredTodos.slice(firstIndex,lastIndex);
    const npage = Math.ceil(filteredTodos.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    
  return <Fragment>
  <div className='justify-content-center'>
  <SearchBar handleSearch={handleSearch} />
  </div>
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
        records.map((todo) =>(
            <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td><EditTodo todo = {todo} /></td>
                <td><button className='btn btn-danger' onClick={()=>{deleteTodo(todo.todo_id)}} >Delete</button></td>
            </tr>
        ))
      }
    </tbody>
  </table>
  <nav >
    <ul className='pagination justify-content-center'>
      <li className='page-item'>
      <a href='#' className='page-link' onClick={prePage}>Prev</a>
      </li>
      {
        numbers.map((n,i) => (
          <li className= {`page-item ${currentPage===n ? 'active' : ''}`} key={i}>
              <a href='#' className='page-link' onClick={()=> changeCpage(n)}>{n}</a>
          </li>
        ))
      }
      <li className='page-item'>
      <a href='#' className='page-link' onClick={nextPage}>Next</a>
      </li>
    </ul>
  </nav>

  </Fragment>;

  function nextPage(){
    if(currentPage !== npage){
      setCurrentPage(currentPage+1);
    }

  }
  function prePage(){
    if(currentPage !== 1){
      setCurrentPage(currentPage-1);
    }

  }
  function changeCpage(id){
    setCurrentPage(id);

  }
}

export default ListTodos