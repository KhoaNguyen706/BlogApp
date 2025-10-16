import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        UserId:{
            type: String,
            require:true,
        },
        title:{
            type: String,
            require:true
        },
        content:{
            type:String,
            require:true,
        },
        category:{
            type:String,
            require:true,
        },
        tags:{
            type:[String],
            require:true,
        }}
        ,{timestamps:true}
)

const Blog = mongoose.model("Blog",BlogSchema)

export default Blog;