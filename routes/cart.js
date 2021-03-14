const { Router } = require('express')
const Course = require('../models/course')



function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc,
        id: c.courseId._id,
        count: c.count
    }))
}

function countPrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}
const router = Router()

router.post('/add', async(req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/cart')
})

router.delete('/remove/:id', async(req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.courseId').execPopulate()
    const courses = mapCartItems(user.cart)
    const cart = {
        courses,
        price: countPrice(courses)
    }
    res.status(200).json(cart)
})

router.get('/', async(req, res) => {
    const user = await req.user.populate('.cart.items.courseId').execPopulate()

    console.log(courses)

    res.render('cart', {
        title: 'Cart',
        isCart: true,
        courses: courses,
        price: countPrice(courses)
    })
})

module.exports = router