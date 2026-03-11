// app.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes.ts";
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());


// Pour recuper les token
app.use(cookieParser());


// === CORS  ===
app.use(cors({
  origin: "http://localhost:5173", // front React
  credentials: true,               // nécessaire pour les cookies JWT
}));

// route de test
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// toutes les routes passent par "/api"
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Serveur express tourne sur : http://localhost:${PORT}`);
});