import { Customer } from "../models/customerSchema.js";

export const createCustomer = async (req, res) => {
  try {
    const customers = Array.isArray(req.body) ? req.body : [req.body];

    const newCustomers = customers.map(cust => ({
      ...cust,
      totalSpend: Number(cust.totalSpend) || 0,
      visits: Number(cust.visits) || 0,
    }));

    const createdCustomers = await Customer.insertMany(newCustomers);

    res.status(201).json({
      message: "Customer(s) created successfully",
      data: createdCustomers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating customer(s)",
      error: err.message,
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ data: customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customers", error: err.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ data: customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customer", error: err.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer updated", data: updatedCustomer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating customer", error: err.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.status(404).json({ message: "Customer not found" });
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting customer", error: err.message });
  }
};

export const getSegmentedCustomers = async (req, res) => {
  try {
    const rules = req.body;
    const customers = await Customer.find(rules);
    res.status(200).json({ audienceCount: customers.length, data: customers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching segmented customers", error: err.message });
  }
};
