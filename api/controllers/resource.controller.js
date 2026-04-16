import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";

// Create a new resource
export const createResource = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "Not allowed"));
  const { title, description, type, link } = req.body;
  if (!title || !description || !link) return next(errorHandler(400, "Missing fields"));

  try {
    const newResource = new Resource({
      title,
      description,
      type,
      link,
      createdBy: req.user.id,
    });
    const saved = await newResource.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Get all resources (public)
export const getAllResources = async (req, res, next) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json({ resources });
  } catch (err) {
    next(err);
  }
};

// Update resource (admin only)
export const updateResource = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "Not allowed"));
  const { resourceId } = req.params;

  try {
    const updated = await Resource.findByIdAndUpdate(
      resourceId,
      { $set: req.body },
      { new: true }
    );
    if (!updated) return next(errorHandler(404, "Resource not found"));
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete resource (admin only)
export const deleteResource = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "Not allowed"));
  const { resourceId } = req.params;

  try {
    const deleted = await Resource.findByIdAndDelete(resourceId);
    if (!deleted) return next(errorHandler(404, "Resource not found"));
    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (err) {
    next(err);
  }
};
