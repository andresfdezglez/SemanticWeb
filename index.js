const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const swig  = require('swig');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {

    let respuesta = swig.renderFile("index.html")
    res.send(respuesta)

})

app.post('/search',function(req,res) {
        console.log(req.body.state)
        findState(req.body.state,function (items) {
            let respuesta =  swig.renderFile("index.html",{
                items:items
            })
            res.send(respuesta)
        })

})

const fetch = require('node-fetch');
const WBK = require("wikibase-sdk");

const wbk = WBK({
    instance: 'http://156.35.98.119'
})

const headers = { 'Accept': 'application/json' };
const urlFindAll = wbk.searchEntities({ search: "tornado"})

function findEntities(url,state,callback){

    fetch(url, { headers }).then(body => {
        body.json().then(data => {

            itemsFound = []

            for (var e in data.entities){
                valueProperty = data.entities[e].claims.P6[0].mainsnak.datavalue.value.id
                if(valueProperty === state){
                    var obj = {
                       title: data.entities[e].labels.en.value ,
                       lat:  parseFloat(data.entities[e].claims.P26[0].mainsnak.datavalue.value.amount),
                       lon: parseFloat(data.entities[e].claims.P27[0].mainsnak.datavalue.value.amount)
                    }

                    itemsFound.push(obj)
                }


            }
            if(itemsFound.length > 0){
                callback(itemsFound)
            }
            else{
                callback("No hay resultado")
            }

        });
    });
}

function findAllByState (state,callback){

    fetch(urlFindAll, { headers }).then(body => {

        body.json().then(data => {
            var items = []
            for(i in data.search)
                if(i >0)
                    items.push(data.search[i].id)

            url = wbk.getEntities(items)

            findEntities(url,state,function (itemsFound) {

                callback(itemsFound)

            })

        });
    });

}

function findState(state,callback){
    const url = wbk.searchEntities({ search: state})

    fetch(url, { headers }).then(body => {
        body.json().then(data => {


            findAllByState(data.search[0].id,function (items) {
                callback(items)
            })


        });
    });

}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})