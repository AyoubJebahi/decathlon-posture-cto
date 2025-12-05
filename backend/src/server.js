import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import profileRoutes from "./routes/profile.routes.js";
import movesRoutes from "./routes/moves.routes.js";
import productsRoutes from "./routes/products.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/moves", movesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
