import {blogPost,deleteBlog, getAllBlog, getMyBlog, getSingleBlog, updateBlog} from '../controllers/blogController.js';
import express from 'express'
import {isAuthenticated,isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.post('/postblog', isAuthenticated,isAuthorized("Author"),blogPost);
router.delete("/delete/:id", isAuthenticated,isAuthorized("Author"), deleteBlog)
router.get("/all",getAllBlog)
router.get("/singleblog/:id",isAuthenticated, getSingleBlog);
router.get('/Myblogs',isAuthenticated, isAuthorized("Author"), getMyBlog);
router.put("/update/:id",isAuthenticated, isAuthorized("Author"), updateBlog)
export default router;