const postRouter=require('express').Router();
const Post=require('../model/postschema')


postRouter.post('/create',async(req,res)=>{
    const {title,content}=req.body;
    try{
        if(!title || !content){
            return res.status(400).json({message:"Please provide all the required fields"})
        }
        const post=new Post({
            title,
            content
        })
        await post.save()
        res.status(201).json({message:"Post created successfully"})
    }
    catch(error){
        console.error("Error creating post:", error);
        res.status(500).json({message:"Internal server error"})
    }
})

postRouter.get('/',async(req,res)=>{
    try{    
        const posts=await Post.find();
        res.status(200).json(posts)
    }
    catch(error){
        console.error("Error fetching posts:", error);
        res.status(500).json({message:"Internal server error"})
    }

})
postRouter.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        res.status(200).json(post)
    }
    catch(error){
        console.error("Error fetching post:", error);
        res.status(500).json({message:"Internal server error"})
    }
})

postRouter.put('/:id',async(req,res)=>{

    try{
        const {id}=req.params;
        const updatedPost=await Post.findByIdAndUpdate(id,req.body);
        if(!updatedPost){
            return res.status(404).json({message:"Post not found"})
        }
        res.status(200).json(updatedPost)
    }
    catch(error){
        console.error("Error updating post:", error);
        res.status(500).json({message:"Internal server error"})
    }
})

postRouter.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const deletedPost=await Post.findByIdAndDelete(id);
        if(!deletedPost){
            return res.status(404).json({message:"Post not found"})
        }   
        res.status(200).json({message:"Post deleted successfully"})
    }

    catch(error){
        console.error("Error deleting post:", error);
       res.status(500).json({message:"Internal server error"})
    }
})

module.exports=postRouter;
