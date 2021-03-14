const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const ehbs = require('express-handlebars')

const app = express()

const homeRoute = require('./routes/home')
const addRoute = require('./routes/add')
const courseRoute = require('./routes/courses')
const cartRoute = require('./routes/cart')

const User = require('./models/user')

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

app.use(async(req, res, next) => {
    try {
        const user = await User.findById('604df7d7a4bc2d43738b76bd')
        req.user = user
        next()
    } catch (error) {
        console.log(error)
    }
})

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

        const candidate = await User.findOne()

        if (!candidate) {
            const user = new User({
                email: 'neilsa@mail.ru',
                name: 'Andrej',
                cart: { items: [] }
            })

            const newUser = await user.save()
                // console.log(newUser)
        }



        app.listen(PORT, () => {
            console.log('Running app')
        })
    } catch (error) {
        console.log(error)
    }
}

start()