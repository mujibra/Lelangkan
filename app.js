const express = require('express')
const routes = require('./routes/index')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended : false}))

app.use('/', routes)

app.listen(port, (err, data) => {
    if(err){
        console.log(err)
    } else {
        console.log(`Gaskeun ${port}`)
    }
})