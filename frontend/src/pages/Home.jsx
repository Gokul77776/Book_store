import React from 'react'
import axios from "axios"
import {useEffect,useState} from "react"
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs"
import {MdOutlineAddBox,MdOutlineDelete} from "react-icons/md"



const Home = () => {
    const [books,setBooks] = useState([]);
    const [loading,setloading] = useState(false);
    useEffect(()=>{
        setloading(true);
        axios.get('http://localhost:7000/books').then((res)=>{
            setBooks(res.data.data);
            setloading(false);
        }).catch((err)=>{
            console.log(err);
            setloading(false);
            
        });
},[]);
  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl'/>
            </Link>
        </div>

        { loading ? (
        <Spinner/>
    ) : (
        <table className='w-full border-separate'>
        <thead>
        <tr>
        <th className='border border-slate-600 rounded-md'>No</th>
        <th className='border border-slate-600 rounded-md'>Title</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
        <th className='border border-slate-600 rounded-md max-md:hidden'>Operations</th>
        </tr>
        </thead>
        <tbody>
        {books.map((book,index)=>(
            <tr className='h-8' key={book._id}>
                <td className='border border-slate-700 rounded-md text-center'>
                    {index+1}
                </td>
                <td className='border border-x-slate-700 rounded-md text-center'>
                    {book.title}
                </td>
                <td className='border border-x-slate-700 rounded-md text-center max-md:hidden'>
                    {book.author}
                </td>
                <td className='border border-x-slate-700 rounded-md text-center  max-md:hidden'>
                    {book.publishYear}
                </td>
                <td className='border border-x-slate-700 rounded-md text-center '>

                     <div className='flex justify-center gap-4'>
                     <Link to={`/books/show/${book._id}`}>
                     <BsInfoCircle className='text-2xl text-green-800'/>
                        </Link>
                        <Link to={`/books/edit/${book._id}`}>
                     <AiOutlineEdit className='text-2xl text-green-800'/>
                        </Link>
                        <Link to={`/books/delete/${book._id}`}>
                     <MdOutlineDelete className='text-2xl text-green-800'/>
                        </Link>
                     </div>
                </td>
            </tr>
        ))}
        </tbody>

        </table>
    )}
  
        
    </div>
  )
    
}

export default Home