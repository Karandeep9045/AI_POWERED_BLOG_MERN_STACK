import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';
import main from '../configs/gemini.js';
import Comment from '../models/Comment.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        console.log(imageFile)
        console.log("imageFile")

        // console.log(title, subTitle, description, category, isPublished)

        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, messgage: "Missing requires fields" })
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })
        console.log(response)
        console.log("response")

        //optimization through imagekit url transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' }, //Auto Compression 
                { format: 'webp' },  //convert to modern Format 
                { width: '1280' },   //width resizing

            ]
        });

        console.log(optimizedImageUrl)
        console.log("optimizedImageUrl")

        const image = optimizedImageUrl;
        console.log(image)
        console.log("image")
        await Blog.create({ title, subTitle, description, category, image, isPublished })
        res.json({ success: true, message: "Blog Added Successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({ success: true, blogs })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" })
        }
        res.json({ success: true, blog })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        
        //delete all comments associated with the blog
        await Comment.deleteMany({blog: id}); 

        res.json({ success: true, message: "Blog deleted Successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id)
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog status updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        await Comment.create({ blog: blogId, name, content });
        res.json({ success: true, message: "Comment added for review" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getBlogComments = async (req, res) => {
    try {
        const {blogId} = req.params;
        console.log(blogId)
        const comments = await Comment.find({ blog: blogId, isApproved: true}).sort
        ({createdAt:-1});
        if(comments.length === 0){
            console.log("No comments found")
            return res.json({ success: true, comments: [] })
        }
        res.json({ success: true, comments })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const generateContent = async (req, res) => {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format ')
        res.json({ success: true, content })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

