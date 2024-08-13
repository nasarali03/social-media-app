import express from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import router from "./routes/user.route.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", router);

connectDB()
  .then(() => console.log("Connected to MONGODB"))
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
  )
  .catch((err) => console.log(err));
