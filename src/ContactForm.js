import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    let formErrors = {};
    if (!formData.fullName.trim()) {
      formErrors.fullName = "Full name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formData.message.trim()) {
      formErrors.message = "Message is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit data to the backend
      fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsSent(true);
            setFormData({ fullName: "", email: "", message: "" }); // Clear the form
            alert("Email sent successfully!");
          } else {
            alert("Failed to send the email.");
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Error sending email.");
        });
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your Full Name"
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          />
          {errors.message && <p className="error">{errors.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
      {isSent && <p>Your message has been sent!</p>}
    </div>
  );
};

export default ContactForm;
