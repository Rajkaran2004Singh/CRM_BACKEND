import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer, deleteCustomer, getSegmentedCustomers, } from "../controllers/customerControllers.js";

const router = express.Router();

router.post("/", isAuthenticated, createCustomer);
router.get("/", isAuthenticated, getAllCustomers);
router.get("/:id", isAuthenticated, getCustomerById);
router.put("/:id", isAuthenticated, updateCustomer);
router.delete("/:id", isAuthenticated, deleteCustomer);
router.post("/segment", isAuthenticated, getSegmentedCustomers);

export default router;
