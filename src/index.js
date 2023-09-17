// Levantar el server con nodemon en el index, para asi poder usar la API !

require('./db/mongoose');
const express = require('express');
const app = express();
const port = 3001;
const Dish = require('./model/dishes');

app.use(express.json());

// Read-- Mostrar todos los platos
app.get('/dishes', (req, res) => {
    Dish.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.status(404).send(err));
})

// Create -- Agregar Platos a la DB
app.post('/dish', (req, res) => {
    const dish = new Dish(req.body)
    dish.save()
        .then(() => {
            res.status(201).send(dish);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// Update
// app.update()

// Delete
// app.delete()

app.listen(port, () => {
    console.log(`Funcionando en http://localhost:${port}`);
});
