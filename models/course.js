const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')

class Course {
    constructor(title, img, price) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuid()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            id: this.id,
            img: this.img
        }
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
                        console.log(err)
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

    static async getById(id) {
        const all = await Course.getAll()
        return all.find(course => course.id == id)
    }

    static async update(course) {
        const all = await Course.getAll()

        const idx = all.findIndex(item => item.id === course.id)

        all[idx] = course

        console.log(all)

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'course.json'),
                JSON.stringify(all),
                (err) => {
                    if (err) {
                        console.log(err)
                        rej(err)
                    } else {
                        res()
                    }
                }
            )
        })
    }
}

module.exports = Course