const express = require('express')
const path = require('path')
const ehbs = require('express-handlebars')

const app = express()

const homeRoute = require('./routes/home')
const addRoute = require('./routes/add')
const courseRoute = require('./routes/courses')

const hbs = ehbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use('/', homeRoute)
app.use('/add', addRoute)
app.use('/courses', courseRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('Running app')
})