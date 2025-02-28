import React from 'react' 
import axios from "axios"
import {useNavigate,useParams} from "react-router-dom"
import Backbtn from "../../components/Backbtn"
import Spinner from '../../components/Spinner'
import { useEffect, useState } from "react"
import {useSnackbar} from "notistack"




const DeleteBook = () => {
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
const {enqueueSnackbar} = useSnackbar();

  const handleDelete = ()=>{
    setloading(true);
    axios.delete(`http://localhost:7000/books/${id}`).then(()=>{
      setloading(false);
      enqueueSnackbar("Book Deleted successfully ",{variant:'success'});

      navigate('/');
    }).catch((err)=>{
      setloading(false);
      enqueueSnackbar("Error",{variant:'error'});
      console.log(err);
      
    });
  }
  return (
    <div className='p-4'>
      <Backbtn/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl '>Are You Sure You want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDelete}>
          Yes,Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteBook