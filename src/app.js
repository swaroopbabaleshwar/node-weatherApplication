const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 3000;

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebar engine and view location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'SwapIndex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'swapAbout'
    });
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'swapHelp'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You should povide an address'
        });
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if(err) {
            return res.send({
                err: err
            });
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                } else {
                    res.send({
                        'weather report': data,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
    // res.send({
    //     forecast: 'forecast',
    //     location: 'location',
    //     address: req.query.address
    // });
});


// app.get('/products', (req, resp) => {
//     if(!req.query.search) {
//         return resp.send({
//             error: 'search not found' 
//         })
//     }
//     console.log(req.query);
//     resp.send({
//         products: []
//     })
// })
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help article not found'
    })
});

//wild card character - match any thing that has not matched so far
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'My 404 Page'
    })
});

app.listen(port, () => {
    console.log('Server is up on the port', port)
});