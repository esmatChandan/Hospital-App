import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
// import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "*", // Allow all origins, or specify allowed domains e.g., ["http://localhost:3000"]
  credentials: true, // If you are dealing with credentials (cookies, authorization headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};
app.get("/", (req, res) => {
  res.send("Api is working");
});
//DATABSE CONNECTIONS
mongoose.set("strictPopulate", false);
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Not Connected");
  }
};

//midelware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/auth", authRoute); //domain /api/v1/auth/register
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctor", doctorRoute);
// app.use("/api/v1/review", reviewRoute);

app.listen(port, () => {
  connectDb();
  console.log(`server is running is port  ${port}`);
});
