const express = require('express')
const booksRouter = express.Router()

const app = express()

// app.set('view engine', 'pug')
// app.set('view engine', 'ejs')
app.set('view engine', 'hbs')
app.set('views', './views')

const products = ['Apple', 'Banana', 'Grape']

app.use((req, res, next) => {
    console.log("Date", new Date(), 'Method', req.method, 'URL', req.originalUrl, 'Ip', req.ip)
    next()
})

app.use('/static', express.static(__dirname + '/public'))

app.get('/', (req, res, next) => {
    res.send('EX Work')
})

app.get('/products', (req, res, next) => {
    // res.send(products)
    console.log('Page', req.query.page)
    res.json({ products })
})

app.get('/products/:id', (req, res, next) => {
    if (products[req.params.id]) {
        res.send(products[req.params.id])
    } else {
        res.status(404).send('Product not found')
    }
})

booksRouter.get('/', (req, res) => {
    res.send('books')
})

booksRouter.get('/about', (req, res) => {
    res.send('about books')
})

app.get('/blog', (req, res) => {
    res.redirect('/')
})

app.get('/downloadBoks', (req, res) => {
    res.download('./public/books.html', 'anyFileName', (err) => {
        console.log('file sent')
    })
})

app.get('/pug', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products
    })
})

app.get('/ejs', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products
    })
})

app.get('/hbs', (req, res, next) => {
    res.render('main', {
        title: 'Products',
        message: 'Products List',
        products
    })
})

app.use('/books', booksRouter)

app.use((err, req, res, next) => {
    console.log(err.status)
    res.status(500).send(err.stack)
})

app.listen(5000, () => {
    console.log('start', new Date())
})