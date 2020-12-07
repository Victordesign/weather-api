const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
const api = require('./data.json')


// middlware 
app.use(express.json()); 
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));



// homepage
app.get('/', async (req, res, next) => {
       res.render('index',{city:null,
    weather:null})
   })


   // make a post 
app.post('/', async (req, res, next) => {

    const city = req.body.city
    // Express5 will support promises. So probably this try-catch won't be necessary
    try {
     const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api.key}`)
     const json = await result.json();
     if(json.name == undefined){
        res.render('error')
     }else{
        res.render('index',{city:json.name,
            weather: json.main.temp
           })
     }  
    } catch (err) {
     next(err)
    }
   })







app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))