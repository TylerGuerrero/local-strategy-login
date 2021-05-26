const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')

const config = require('./config/Config')

const app = express();

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.database, options)
        .catch((error) => console.log(error))

mongoose.connection.on('error', () => {
    console.log('MongoDB has a server DB error')
})

mongoose.connection.once('open', () => {
    console.log('MongoDB is running');
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(morgan('dev'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
})