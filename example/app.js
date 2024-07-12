const express = require('express')
const app = express()

// const User = require('./controllers/user')
const user = require('./src/routes/user')
const book = require('./src/routes/book')

const errorHandlerMiddleware = require('./src/middleware/errorHandlerMiddleware')

require('dotenv').config();
const port = process.env.PORT || 3000;

// app.get('/', (req, res, next) => {
//     res.json({
//         'status': true,
//         'message': 'Hello World!'
//     })
// })

app.use(express.json())
// app.use(express.urlencoded({
//     extended: true,
//     inflate: true,
//     limit: '100kb',
//     parameterLimit: 1000,
//     type: 'application/x-www-form-urlencoded',
//     verify: undefined
// }))

app.use('/user', user)
app.use('/book', book)

app.all('*', errorHandlerMiddleware.NotFound)
app.use(errorHandlerMiddleware.Handler)

app.listen(port, () => console.log(`Server started on port ${port}`))