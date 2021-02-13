const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static async add(course) {
        const cart = await Cart.fetch()

        const idx = cart.courses.findIndex(item => item.id === course.id)
        const candidate = cart[idx]

        if (candidate) {
            candidate.count++
                cart.courses[idx] = candidate
        } else {
            course.count = 1
            cart.courses.push(course)
        }

        cart.price += +course.price

        console.log(cart)

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((res, rej) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    rej(err)
                } else {
                    res(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart