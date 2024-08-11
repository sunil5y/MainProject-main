const Payment = require("../Models/paymentModel");
const domain = "http://localhost:1000";

// Helper function to send error responses
const sendErrorResponse = (res, error) => {
  console.log(error);
  res.status(500).json({ msg: error.message });
};

// Payment
const paymentBike = async (req, res) => {
  try {
    const {
      name,
      number,
      expiration,
      cvv,
    } = req.body;
    let paymentData = {
      name,
      number,
      expiration,
      cvv,
    };

    const payment = new Payment(paymentData); 
    await payment.save();

    res.status(201).json({
      msg: "Payment done successfully",
      payment: payment,
      success: true,
    });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};


module.exports = {
    paymentBike,
};
