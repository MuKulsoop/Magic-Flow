import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import contractRoutes from "./routes/contract.routes.js";
import authRoutes from "./routes/authRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import deployRoute from "./routes/deploy.js"

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Fixed: added ()


// Routes
app.use("/api/contracts", contractRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/ai", aiRoutes);
app.use('/api/sui', deployRoute);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`The server is running on PORT ${PORT}`);
});
