require('dotenv').config()

const express = require('express')
const bodyparser= require('body-parser')

const cors = require('cors')

const db = require('./db')

const  userRoute = require('./routes/usersapi')





const app = express()
app.use(bodyparser.json())

app.use(cors())


app.use('/api/user',userRoute)






const port = process.env.PORT

app.get('/',(req,res)=>{
    res.send("Hello World from server")
})

app.listen(port,()=>{
    console.log(`Server is Running on : http://localhost:${port}`)
})