const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
dotenv.config()
const app = express()
const port = process.env.PORT || 5000;
const authRoute = require("./routes/authRoute")
const postRoute = require("./routes/postRoute")

app.use(cors())
app.use(express.json())

connectDB()

app.get((req,res)=>{
    res.send("blog api is running")
})

app.use("/api/route",authRoute)
app.use("/api/route",postRoute)

app.listen(port,()=>{
    console.log("server started")
})


