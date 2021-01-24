const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')

class Course {
    constructor(data) {
        this.title = data.title
        this.price = data.price
        this.img = data.img
        this.id = uuid()
    }

    toJSON() {
        return JSON.stringify({
            title: this.title,
            price: this.price,
            id: this.id,
            img: this.img
        })
    }

    async save() {
        const courses = await Course.getAll()
        courses.push(this.toJSON())

        console.log('courses', courses)

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'course.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        rej(err)
                    } else {
                        res()
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'course.json'), 'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                }
            )
        })

    }
}

module.exports = Course