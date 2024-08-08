
require('dotenv').config()
const {conn} = require('./db/conn')
const express = require('express');
var userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.json());

app.use(cors(
    {
        origin:["http://localhost:5173"],
        credentials:true
    }
));
app.use('/auth', userRoutes);

const start = async () => {
    
    try {
        await conn.connect((err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log("connected to database successfully")
        })

        app.listen(port, console.log(`app listening on port : ${port}`))
        
    } catch (error) {
        console.log(error)
    }
}
start()