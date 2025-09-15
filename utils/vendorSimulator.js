export const sendViaVendor = async (customer, message) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() < 0.9;
      resolve({
        status: success ? "SENT" : "FAILED",
        customerId: customer._id,
      });
    }, 200);
  });
};