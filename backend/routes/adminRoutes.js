import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, disapproveCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments",auth, getAllComments);
adminRouter.get("/blogs",auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment",auth, deleteCommentById);
adminRouter.patch("/approve-comment",auth, approveCommentById);
adminRouter.patch("/disapprove-comment",auth, disapproveCommentById);
adminRouter.get("/dashboard",auth, getDashboard);

export default adminRouter;