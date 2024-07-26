import React,{Fragment,useState} from 'react'
import './InputTodo.css'


const InputTodo = () => {
  const [description,setdescription] = useState("");
  const onSubmitForm = async (e) =>{
    e.preventDefault();
    try {
      const body = {description};
      // let obj = {
      //   "description": description
      // }
      // axios.post("http://localhost:5000/todos",obj).then((response)=>{
      //   console.log(response);
      // }).catch((err) => console.error(err.message));
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch("http://localhost:5000/todos",{
        method: "POST",
        credentials: 'include',
        // headers: {"Content-type": "application/json"},
        headers:headers,
        body: JSON.stringify(body)
      });

      const responseData = await response.json();

      if (!response.ok) {

        console.error(responseData.error); 
      } else {
        
        console.log("Todo created successfully");
        window.location = "/app";
      }
      
    } catch (err) {
      console.error(err.message);
      
    }
  }
  return (
    <Fragment>
      <h1 className="text-center mt-5 todo-heading">Pern Todo List</h1>
      <form className='d-flex mt-5' onSubmit ={onSubmitForm}>
      <input type='text' value={description} className='form-control' onChange={(e)=>{setdescription(e.target.value)}} ></input>
      <button className='btn btn-success'>Add</button>
       
      </form>
    
    </Fragment>
    
  )
}

export default InputTodo