const fetch = require('node-fetch');
const WBK = require("wikibase-sdk");

const wbk = WBK({
    instance: 'http://156.35.98.119'
})

var state = "Florida"

let stateToFind="";

const headers = { 'Accept': 'application/json' };
const urlFindAll = wbk.searchEntities({ search: "tornado"})
const url2 = wbk.cirrusSearchPages({ haswbstatement: 'P6=Q12' })

function findAll(){

    var entities = []

   fetch(urlFindAll, { headers }).then(body => {
        body.json().then(data => {
            url = wbk.getEntities(data.search[1].id)


           console.log(data.search)
        });
    });

}

findAll()