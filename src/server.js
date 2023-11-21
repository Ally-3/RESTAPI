require("dotenv").config();
const express = require("express");
const app = express();

const User = require("./models/user");
const userRouter = require("./routes/userroutes");

function syncTables() {
    User.sync({ alter : true })
}

const port = process.env.PORT || 5002

app.use(express.json());
app.use(userRouter);

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is running"})
})

app.listen (port, () => {
    console.log(`app is listening on ${port}`);
    syncTables();
})
