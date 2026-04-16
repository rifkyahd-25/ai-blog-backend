import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
} from "../controllers/resource.controller.js";

const router = express.Router();

// Admin creates a resource
router.post("/create", verifyToken, createResource);

// Public: Get all resources
router.get("/getall", getAllResources);

// Admin updates a resource
router.put("/update/:resourceId/:userId", verifyToken, updateResource);

// Admin deletes a resource
router.delete("/delete/:resourceId/:userId", verifyToken, deleteResource);

export default router;
