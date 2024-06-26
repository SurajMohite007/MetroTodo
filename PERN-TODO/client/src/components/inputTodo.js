import React,{Fragment,useState} from 'react'
// import axios from 'axios'

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
      const response = await fetch("http://localhost:5000/todos",{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)
      });

      window.location = "/";

      
    } catch (err) {
      console.error(err.message);
      
    }
  }
  return (
    <Fragment>
      <h1 className="text-center mt-5 ">Pern Todo List</h1>
      <form className='d-flex mt-5' onSubmit ={onSubmitForm}>
      <input type='text' value={description} className='form-control' onChange={(e)=>{setdescription(e.target.value)}} ></input>
      <button className='btn btn-success'>Add</button>
       
      </form>
    
    </Fragment>
    
  )
}

export default InputTodo