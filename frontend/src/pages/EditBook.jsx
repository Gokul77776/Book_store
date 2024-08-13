import React from 'react'
import Spinner from '../../components/Spinner'
import Backbtn from "../../components/Backbtn"
import { useEffect, useState } from "react"
import axios from "axios"
import {useNavigate,useParams} from "react-router-dom"
import {useSnackbar} from "notistack"



const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
const {enqueueSnackbar} = useSnackbar();


  useEffect(()=>{
    setloading(true);
    axios.get(`http://localhost:7000/books/${id}`).then((res)=>{
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear);
      setloading(false);
    }).catch((err)=>{
      console.log(err);
      setloading(false);
    })
  },[])



   const editBook = ()=>{
    const data = {
      title,
      author,
      publishYear
    };
    setloading(true);
    axios.put(`http://localhost:7000/books/${id}`,data).then(()=>{
      setloading(false);
      enqueueSnackbar("Book Edited successfully ",{variant:'success'});

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
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading  ? <Spinner/> : "" }
      <div className='flex flex-col border-3 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl text-gray-500 '>Title</label>
          <input type="text" value={title}  onChange={(e)=>setTitle(e.target.value)} className='border-2 border-gray-500 py-2 px-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500 '>Author</label>
          <input type="text" value={author}  onChange={(e)=>setAuthor(e.target.value)} className='border-2 border-gray-500 py-2 px-2 w-full'/>
        </div>
        <div className='my-4'>
          <label className='text-xl text-gray-500 '>Publish Year</label>
          <input type="text" value={publishYear}  onChange={(e)=>setPublishYear(e.target.value)} className='border-2 border-gray-500 py-2 px-2 w-full'/>
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={editBook}>Save</button>

      </div>
    </div>
  )
}

export default EditBook