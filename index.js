const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ehbs = require('express-handlebars')

const app = express()

const homeRoute = require('./routes/home')
const addRoute = require('./routes/add')
const courseRoute = require('./routes/courses')
const cartRoute = require('./routes/cart')

const hbs = ehbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoute)
app.use('/add', addRoute)
app.use('/courses', courseRoute)
app.use('/cart', cartRoute)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = `mongodb+srv://andrej:Hw7wHHZsqqirdD4A@cluster0.grhht.mongodb.net/shop`
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log('Running app')
        })
    } catch (error) {
        console.log(error)
    }
}

start()