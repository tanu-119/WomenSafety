const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const ejs = require("ejs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const User = require("./models/User");
const cors = require("cors");
const axios = require("axios");
const fast2sms = require("fast-two-sms");

const app = express();

dotEnv.config();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow cookies or authentication headers
  })
);

app.use(express.json()); // Add this to parse JSON payloads

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Succesfully!");
  })
  .catch((error) => {
    console.log(`${error}`);
  });

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySession",
});

app.use(
  session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

/*
const checkAuth = (req, res, next) => {
  if (req.session.isAuthicated) {
    next();
  } else {
    res.redirect("/signup");
  }
};
*/

// Signup Route
app.post("/signup", async (req, res) => {
  console.log("Signup Request Body:", req.body);
  try {
    // Existing user check
    const existingUser = await User.findOne({ mobileNo: req.body.mobileNo });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Mobile number already registered" });
    }
    // Create and save user
    const newUser = new User(req.body);
    await newUser.save();

    // Set session data after successful signup
    req.session.isAuthenticated = true;
    req.session.userId = newUser._id;

    // Send response with success status and message
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Error during signup", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  console.log("Login Request Body:", req.body);
  try {
    const user = await User.findOne({ mobileNo: req.body.mobileNo });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Set session data on successful login
    req.session.isAuthenticated = true;
    req.session.userId = user._id;

    // Send success response
    res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error during login", error });
  }
});

//Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    console.log("Session destroyed successfully.");
    res.status(200).json({ message: "Logout successful" });
  });
});

// Emergency Contact Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  phone: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes

// Fetch all contacts
app.get("/emergency-contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ contacts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// Add a new contact
app.post("/emergency-contacts", async (req, res) => {
  try {
    const { name, relation, phone } = req.body;
    const newContact = new Contact({ name, relation, phone });
    await newContact.save();
    res.status(201).json({ contact: newContact });
  } catch (err) {
    res.status(500).json({ message: "Error adding contact" });
  }
});

// Delete a contact
app.delete("/emergency-contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact" });
  }
});

// SOS Alert Route
app.post("/send-sos", async (req, res) => {
  try {
    // Fetch all emergency contacts from the database
    const contacts = await Contact.find();

    const numbers = contacts.map((contact) => contact.phone);

    // Message to be sent
    const message =
      "This is an SOS emergency alert. Please assist immediately.";
    // Send SMS using aFreeSms API
    const response = await fast2sms.sendMessage({
      authorization: process.env.API_KEY,
      message: message,
      numbers: numbers,
    });
    res.send(response);

    res
      .status(200)
      .json({ message: "SOS alert sent successfully to all contacts" });
  } catch (err) {
    console.error("Error sending SOS:", err);
    res.status(500).json({ message: "Failed to send SOS alert" });
  }
});

app.listen(PORT, () => {
  console.log(`Serer started and Running @ ${PORT}`);
});
