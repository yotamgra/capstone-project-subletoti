


//@desc    Get posts
//@route   GET /posts
//@access  Private
const getPosts = (req,res)=>{
    console.log(req.body)
    res.status(200).send({message:"Get posts"})
}

export {getPosts}