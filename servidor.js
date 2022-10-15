const express = require('express');
const mongoose = require('mongoose');
const TareaSchema = require("./modelos/Tarea.js");
const app = express();

//lineas básicas para consumir las apis//
const router = express.Router();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://prog_web:grupo35@cluster0.wwnjort.mongodb.net/bdPruebaNodeG35?retryWrites=true&w=majority");

router.get('/', (req, res) => {
    res.send("Página inicial Api rest");
});

router.get('/tarea', (req, res) => {
    TareaSchema.find(function(err, datos){
        if(err){
            console.log(err);
        } else {
            res.send(datos);
        }
    });
})

router.post('/tarea', (req, res) => {
    let nuevaTarea = new TareaSchema({
        idTarea: req.body.id, 
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle

    });

    nuevaTarea.save(function(err, datos){
        if(err) {
            console.log(err);
        }

        res.send("Tarea Guardada...");
    });
});


app.use(router);

app.listen(
    3000, () =>{
        console.log("Server listen port 3000...");
    }
);