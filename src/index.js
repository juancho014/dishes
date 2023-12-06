// Levantar el server con nodemon en el index, para asi poder usar la API !

require('./db/mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

const bcrypt=require('bcryptjs');
const nodemailer= require('nodemailer')
const Dish = require('./model/dishes');
const Contact= require('./model/mensaje');
const Registro=require('./model/registro')


app.use(cors())
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

app.get('/emails', (req, res) => {
    Contact.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.status(404).send(err));
});

app.get('/registros', (req, res) => {
    Registro.find()
        .then((result) => {
            res.send(result)
        })
        .catch(err => res.status(404).send(err));
});




app.post('/registro', (req,res)=>{
   const {name,password}=req.body;
    console.log(req.body);
    const registro= new Registro({name,password:bcrypt.hashSync(password)})
    console.log(Registro.password,name);
    registro.save()
        .then(()=>{
            res.status(201).send(registro)
            console.log(registro);
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
})

app.post('/login',async (req,res)=>{
    try{
        const usuario=await Registro.findOne({name:req.body.name})
        if(!usuario){
            res.send("usuario no encontrado")
            
        }
        const match=await bcrypt.compare(req.body.password)
            if (match) {
                res.render("index")
            }else{
                req.send("password")
            }
    }catch{
        res.send("wrong details")
    }
  
})



app.post('/email', (req, res) => {
    const email = new Contact(req.body)
    email.save()
        .then(() => {
            res.status(201).send(email);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

        enviarMail=async()=>{

            const config={
                host:'smtp.gmail.com',
                port:587,
                auth:{
                    user:'juanfb19@gmail.com',
                    pass:'osvn sxif smgz jjjh'
                }
            }
            const mensaje={
    
                from:`mensaje de :<${req.body.email}> `  ,
                to:'juanfb19@gmail.com',
                subject: `mensaje de :${req.body.email} `  ,
                text:req.body.mensaje,
                html:`<p>nombre del contacto:${req.body.name}</p>
                      <p>Email:</p><p>${req.body.email}</p>
                    <h3>Mensaje:</h3> 
                             <h4>${req.body.message}</h4>`
                
            }
        
            const transport=nodemailer.createTransport(config);
        
           
        
            const info= await transport.sendMail(mensaje)
        
            console.log(info);
        }
        
        enviarMail()
});



app.listen(port, () => {
    console.log(`Funcionando en http://localhost:${port}`);
});
