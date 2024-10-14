const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Email sending route
app.post("/send-email", (req, res) => {
  const { fullName, email, message } = req.body;

  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service, for example, Gmail
    auth: {
      user: "lakshayjain24@gmail.com", // Your email address
      pass: "penp yhrh xmin ptws", // Your email password (or App Password if using Gmail)
    },
  });

  // Compose the email
  const mailOptions = {
    from: "lakshayjain24@gmail.com", // Sender's email
    to: email, // Receiver's email
    subject: `Message from ${fullName}`, // Email subject
    text: message, // The message
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send({ success: false, error: "Failed to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ success: true, message: "Email sent successfully" });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
