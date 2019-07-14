"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const person_model_1 = __importDefault(require("./person.model"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
//Instancier Express
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.get("/", (req, resp) => {
    resp.send("list of persons");
});
//connexion to MongoDB
const uri = "mongodb://localhost:27017/Person_DB";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Mongo_DB connected with success!");
});
app.get('/persons', (req, resp) => {
    person_model_1.default.find((err, persons) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(persons);
    });
    app.post("/persons", (req, resp) => {
        let person = new person_model_1.default(req.body);
        person.save((err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(person);
        });
    });
});
app.put("/persons/:id", (req, resp) => {
    person_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send('the selected book is updated with success');
    });
});
app.delete("/persons/:id", (req, resp) => {
    person_model_1.default.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send('person deleted with success');
    });
});
// requete with pagination: http://localhost:8085/ppersons?page=1&size=5
app.get('/ppersons', (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    person_model_1.default.paginate({}, { page: p, limit: size }, (err, persons) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(persons);
    });
});
//search with keyword, the url is : http://localhost:8085/ppersons?page=1&size=5&kw=
app.get('/ppersons-search', (req, resp) => {
    let p = parseInt(req.query.page || 1);
    let size = parseInt(req.query.size || 5);
    let kw = req.query.kw || '';
    person_model_1.default.paginate({ title: { $regex: ".*(?i)" + kw + ".*" } }, { page: p, limit: size }, (err, persons) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(persons);
    });
});
app.listen(8086, () => {
    console.log("started");
});
