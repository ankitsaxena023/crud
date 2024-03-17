const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

//Schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create;
app.post("/create", async (req, res) => {
  console.log("crete", req.body);
  const data = await userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data created", data: data });
});

// app.post("/create", async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { name, email, mobile } = req.body;

//     // Create a new document using the FormData model
//     const formData = new FormData({ name, email, mobile });

//     // Save the document to the database
//     await formData.save();

//     // Respond with success message
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

//read
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.send({ success: true, data: data });
  console.log("get", data);
});

// update
// app.put("/update/:id", async (req, res) => {
//   console.log(req.params.id);
//   console.log(req.body);
//   const { _id, ...rest } = req.body;
//   const data = await userModel.updateOne({ _id: id }, rest);
//   res.send({
//     success: true,
//     message: "data update successfully",
//     data: data,
//   });
// });

app.put("/update/:id", async (req, res) => {
  console.log("update", req.body);
  console.log("query", req.query);
  const { id } = req.params;
  console.log("id", id);
  const { name, email, mobile } = req.body;
  try {
    const updatedData = await userModel.findByIdAndUpdate(
      id,
      { name, email, mobile }, // Update the fields specified in req.body
      { new: true } // Return the updated document
    );
    res.send(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "data deleted successfully",
    data: data,
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/crud")
  .then(() => {
    console.log("connection established with Mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("server listening on port");
});
