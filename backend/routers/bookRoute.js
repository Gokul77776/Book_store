import express from "express";
import { Book } from "../models/bookModel.js";


const router = express.Router();

//route for save a new book
router.post('/',async(req,res)=>{
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:"send all required fields"});
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        }
        const book = await Book.create(newBook);
        return res.status(200).send(book)

        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message });       
    }

});

//this method is used to get all books
router.get('/',async(req,res)=>{
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data : books,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message });  
    }
});

//this method is used to get one book by using id
router.get('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if(!book){
            return res.status(404).send({message:"book not found"});
        }
        return res.status(200).json(
             book
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message });  
    }
});

//Route for update a book
router.put('/:id',async(req,res)=>{
        try {
            if(!req.body.title || !req.body.author || !req.body.publishYear){
                return res.status(400).send({message:"send all required fields"});
            }
            const {id} = req.params;
            const result = await Book.findByIdAndUpdate(id,req.body);
            if(!result){
                return res.status(404).json({message:"Book not found"});
            }
            return res.status(200).json({message:"book upadate sucessfully"})

            
        }catch (error) {
            console.log(error);
            res.status(500).send({message:error.message });  
        }
        });

router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
         
        
        if(!result){
            return res.status(404).json({message:"Book not found"})
        }
        return res.status(200).send({message:"Book deleted successfully "})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message }); 
    }
})

export default router;