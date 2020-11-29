const express = require('express')
const booksRouter = express.Router()

const app = express()

const products = ['Apple', 'Banana', 'Grape']

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

app.use('/books', booksRouter)
app.listen(5000, () => {
    console.log('start', new Date())
})