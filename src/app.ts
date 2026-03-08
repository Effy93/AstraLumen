// app.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// toutes les routes passent par "/api"
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Serveur express tourne sur : http://localhost:${PORT}`);
});