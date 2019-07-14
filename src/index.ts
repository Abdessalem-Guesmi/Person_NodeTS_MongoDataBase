import express from "express";
import mongoose from "mongoose";
import Person from "./person.model";
import bodyParser from "body-parser";
import cors from 'cors';
//Instancier Express
const app = express();
app.use(bodyParser.json())
app.use(cors())
app.get("/", (req, resp) => {
    resp.send("list of persons")
});
//connexion to MongoDB
const uri: string = "mongodb://localhost:27017/Person_DB";
mongoose.connect(uri, (err) => {
    if (err) console.log(err)
    else console.log("Mongo_DB connected with success!")
});
app.get('/persons',(req,resp)=>{
    Person.find((err,persons)=>{
        if (err) resp.status(500).send(err)
        else resp.send(persons)
    });

    app.post("/persons", (req, resp) => {
        let person = new Person(req.body)
        person.save((err) => {
            if (err) resp.status(500).send(err)
            else resp.send(person)
        })
    });
    
});
app.put("/persons/:id", (req, resp) => {
    Person.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) resp.status(500).send(err)
        else resp.send('the selected book is updated with success')
    })
});
app.delete("/persons/:id", (req, resp) => {
    Person.findByIdAndDelete(req.params.id, (err) => {
        if (err) resp.status(500).send(err)
        else resp.send('person deleted with success')
    })
});
// requete with pagination: http://localhost:8085/ppersons?page=1&size=5
app.get('/ppersons', (req, resp) => {
    let p: number = parseInt(req.query.page || 1);
    let size: number = parseInt(req.query.size || 5);
    Person.paginate({}, { page: p, limit: size }, (err, persons) => {
        if (err) resp.status(500).send(err);
        else resp.send(persons);
    });

});
//search with keyword, the url is : http://localhost:8085/ppersons?page=1&size=5&kw=
app.get('/ppersons-search', (req, resp) => {
    let p: number = parseInt(req.query.page || 1);
    let size: number = parseInt(req.query.size || 5);
    let kw: string = req.query.kw || '';
    Person.paginate({ title: { $regex: ".*(?i)" + kw + ".*" } }, { page: p, limit: size }, (err, persons) => {
        if (err) resp.status(500).send(err);
        else resp.send(persons);
    })
})
app.listen(8086, () => {
    console.log("started")
})
