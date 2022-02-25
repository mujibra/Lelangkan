const express = require('express')
const routes = require('./routes/index')
const path = require('path')
const app = express()
const session = require('express-session')
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'lanjut phase 2',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))

app.use('/', routes)



app.listen(port, (err, data) => {
    if(err){
        console.log(err)
    } else {
        console.log(`Gaskeun ${port}`)
    }
})