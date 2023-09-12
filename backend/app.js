const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const brcypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const User = require('./models/User')
const Item = require('./models/Item')
const Sale = require('./models/Sale')

const userMiddleware = require('./middleware/user')

const saltRounds = 10

app.use(bodyParser.json())
app.use(cors())
app.use(userMiddleware(true))

app.get('/', (req, res) => {
    res.send("squid")
})

app.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
        brcypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                res.send({
                    token: jwt.sign({ id: user._id }, process.env.SECRET)
                })
            } else {
                res.status(400).send({ error: "Invalid username or password" })
            }
        })
    } else {
        res.status(400).send({ error: "Invalid username or password" })
    }
})

app.post("/signup", async (req, res) => {
    brcypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const user = new User({
            username: req.body.username,
            password: hash
        })

        await user.save()
        res.send({
            token: jwt.sign({ id: user._id }, process.env.SECRET)
        })
    })
})

app.post("/user", async (req, res) => {
    if (req.user) {
        req.user.password = null

        res.send(req.user)
    } else {
        res.status(400).send()
    }
})

app.post("/items", async (req, res) => {
    const items = await Item.find({})

    return res.status(200).json(items)
})

app.post("/items/new", async (req, res) => {
    if (!req.user)
        return res.status(400).send()

    const newItem = new Item({
        currentPrice: req.body.price,
        currentCost: req.body.cost,
        category: req.body.category,
        name: req.body.name
    })

    await newItem.save()
    return res.status(200).send()
})

app.post("/items/update", async (req, res) => {
    if (!req.user)
        return res.status(400).send()

    const item = await Item.findOne({ _id: req.body._id })

    if (!item)
        return res.status(404).send()

    item.currentPrice = req.body.price
    item.currentCost = req.body.cost
    item.category = req.body.category
    item.name = req.body.name

    await item.save()
    return res.status(200).send()
})

app.post("/items/delete", async (req, res) => {
    if (!req.user)
        return res.status(400).send()

    const item = await Item.findOne({ _id: req.body._id })

    if (!item)
        return res.status(404).send()

    await Item.deleteOne({ _id: req.body._id })
    return res.status(200).send()
})

app.post("/sales", async (req, res) => {
    // const sales = await Sale.find({ time: { $lte: req.body.endTime, $gte: req.body.startTime } })
    const sales = await Sale.find({})

    return res.status(200).json(sales)
})

app.post("/sales/register", async (req, res) => {
    const item = await Item.findOne({ _id: req.body.item })

    if (!item)
        return res.status(404).send()

    const newSale = new Sale({
        item: req.body.item,
        price: item.currentPrice,
        cost: item.currentCost,
        time: Date.now()
    })

    await newSale.save()
    return res.status(200).send()
})

app.post("/sales/cancel", async (req, res) => {
    const sale = await Sale.find({ _id: req.body._id })

    if (!sale)
        return res.status(404).send()

    await Sale.deleteOne({ _id: req.body._id })
    return res.status(200).send()
})

module.exports = app