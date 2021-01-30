const express = require('express')
const morgan = require('morgan')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
dotenv.config()
// db connection
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//middlewares
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'development')
{
    app.use(cors({origin: process.env.CLIENT_URL}))
}

// Routes
app.use('/api', authRoutes)

port = process.env.PORT
app.listen(port, ()=> console.log('listening on port : ' + port))
