 
import axios from "axios"
import { useParams } from 'react-router-dom'
import Backbtn from "../../components/Backbtn"
import { useEffect, useState } from "react"
import Spinner from '../../components/Spinner'


const ShowBook = () => {
  const [books,setBooks] = useState([]);
  const [loading,setloading] = useState(false);
  const {id} = useParams();

  useEffect(()=>{
    setloading(true);
    axios.get(`http://localhost:7000/books/${id}`).then((res)=>{
        setBooks(res.data);
        setloading(false);
    }).catch((err)=>{
        console.log(err);
        setloading(false);
        
    });
},[]);
  return (
    <div className="p-4">
      <Backbtn  />
      <h1 className='text-3xl my-4'> Show Book</h1>
      {loading ? (
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Id</span>
            <span>{books._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>title</span>
            <span>{books.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Author</span>
            <span>{books.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>publish Year</span>
            <span>{books.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 '>Created at</span>
            <span>{new Date(books.createdAt).toLocaleString()}</span>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default ShowBook