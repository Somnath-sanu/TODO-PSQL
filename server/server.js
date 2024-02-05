import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { pool } from "./db.js";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());

//get all todos

app.get("/todos/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;
  // console.log(userEmail);
  try {
   
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );

    // console.log(todos)
    res.status(200).json(todos.rows);
    
  } catch (error) {
    // console.log(error)
    res.json({ message: "Error getting Todos" });
  } 
});

// create a new todo

app.post("/todos", async (req, res) => {
  const { user_email, title, progress, data } = req.body;
  const id = uuidv4();
  // console.log(user_email, title, progress, data)
  try {
   
    const newTodo = await pool.query(
      "INSERT INTO todos(id, user_email, title, progress, data) VALUES($1, $2, $3, $4, $5)",
      [id, user_email, title, progress, data]
    );

    res.status(200).json(newTodo);
  } catch (error) {
    res.json({ message: "Error creating Todo", error });
  }
});

// edit a new todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, data } = req.body;

  // console.log(id)
  try {
   
    const updateTodo = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, data = $4 WHERE id = $5;",
      [user_email, title, progress, data, id]
    );

    res.status(200).json(updateTodo);
  } catch (error) {
    res.json({ message: "Error Updating Todo", error });
  } 
});

//DELETE a todo

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    
    const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteTodo);
  } catch (error) {
    res.json({ message: "Error Deleting Todo", error });
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length)
      return res.json({ message: "User does not exist!!" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );

    const token = jwt.sign({ email }, "sanu110", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ message: "Login failed!!!" });
    }
  } catch (error) {
    res.json({ message: "Error login", error });
  }
});

//signup

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hassedPassword = await bcrypt.hash(password, 10);
  try {
    
    const signUp = await pool.query(
      "INSERT INTO users(email, hashed_password) VALUES($1, $2)",
      [email, hassedPassword]
    );

    // console.log(signUp)

    const token = jwt.sign({ email }, "sanu110", { expiresIn: "1hr" });

    res.json({ email, token });

    
  } catch (error) {
    console.log(error)

    res.json({ error : error });
  } 
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
