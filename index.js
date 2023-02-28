require('dotenv').config();

const express = require('express');
const server = express({caseSensitive: false});
const fruits = require('./fruits.json');
const port = process.env.PORT;

// middleman function between req and res
server.use(express.json());

// home route
server.get('/', (req, res) => {
    res.send('Hello, Fruity API!')
})


// return all the fruits route 
server.get('/fruits', (req, res) => {
    res.status(200).send(fruits)
})


// a. return a single fruit route, b. what if fruit is not found, c. what if user submits with no caps
//const {id} = fruits;
server.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() === name);

    if(fruit == undefined) {
        res.status(404).send()
    } else {
        res.status(200).send(fruit)
    }

        
    }
)

// a. check if fruit already exists in data, b. if not, use req.body to add fruit to data OR if yes, return error
server.post('/fruits', (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name == req.body.name);
    
    if(fruit != undefined) {
        res.status(409).send();
    } else {
        fruits.push(req.body);
        res.status(201).send(req.body)
    }

})







// server listening to port
server.listen(port, () => {
    console.log(`App listening on ${port}`)
})




