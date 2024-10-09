const express = require("express")
const router = express.Router()
const Post = require("../routes/postRoute")

router.post("/",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await new Post({
            title,content,
            author:req.user.id
        })
        post = await post.save()
        res.json(post)
    }catch(error){
        res.status(500).json({msg:"server errir"})
    }
})

router.get("/",async(req,res)=>{
    try{
        let post = await Post.find().populate('author',['title','content'])
        let newpost = await post.save()
        res.status(200).json(newpost) 
    }catch(error){
        res.status(500).json("server error")
    }
})

router.get("/",async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id)

        if(!post){
            return res.status(400).json({msg:"no post"})
        }
        let newpost = post.save()
        res.json(newpost)
    }catch(error){
        res.status(500).json(msg:"")
    }
})

router.put("/",authMiddleware,async(req,res)=>{
    const {title,content}=req.body;
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).json({msg:"no post"})
        }
        post = await Post.findByIdAndUpdate(req,params.id,{title,content},{new:true})
        res.json(post)
    }catch(error){
        res.status(200).send("server errir")
    }

})

router.delete("/",authMiddleware,async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(500).json({msg:"no post"})
        }
        let newPost= await post.remove()
        res.json({msg:"post deketed"})
    }catch(error){
        res.status(400).json("error")
    }
})

module.exports = router;