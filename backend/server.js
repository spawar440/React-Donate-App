const express = require("express");
const note = require("./data/notes");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const notes = require("./data/notes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");


app.get("/",(req,resp)=> {

    resp.send("API Running....");
});
 

app.get('/api/notes',(req,resp) => {
    resp.json(notes);
});

/* app.get('/api/notes/:id',(req,resp) => {
    const note = notes.find((n) => n._id === req.params.id);
    resp.send(note); 
});*/

app.use('/api/users',userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT  || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`))

