const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
//define paths to express config
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, '../templates/partials');
//setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewspath)
hbs.registerPartials(partialspath);

//setup static directory
app.use(express.static(path.join(__dirname, "../public")));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Basheer'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ',
        name: 'Basheer'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page',
        name: 'Basheer'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter the address"
        })
    }
    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                address,
                location,
                forecast: forecastdata
            })

        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Basheer',
        error: 'Help article not found',

    })
})


app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Basheer',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("server started");

})