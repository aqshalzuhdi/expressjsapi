const express = require('express')
const app = express()

const errorHandlerMiddleware = require('./src/middleware/errorHandlerMiddleware')
const {createResponse} = require('./src/helpers/foglobal')

require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res, next) => {
    res.json(createResponse({status: true, msg: 'Hello World!'}))
})

// This is routes to src

app.all('*', errorHandlerMiddleware.NotFound)
app.use(errorHandlerMiddleware.Handler)

app.listen(port, () => console.log(`Server started on port ${port}`))