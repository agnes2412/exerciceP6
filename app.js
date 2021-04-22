//J'importe express avec la commande 'require'
const express = require('express');
//J'importe body-parser
const bodyParser = require('body-parser');
//J'importe mongoose
const mongoose = require('mongoose');

//J'importe le modèle 'Thing' crée dans le ficher 'thing.js' pour implémenter les interactions avec la base données MongoDB
const Thing = require('./models/Thing');

//Je crée l'application express
const app = express();

mongoose.connect('mongodb+srv://agnes2412:@Lina@cluster0.egtzz.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//Avec la méthode .use, j'utilise une fonction qui reçoit requête et réponse
//1er middleware exécuté par le serveur. Général, il sera appliqué à toutes les routes, les requêtes envoyées au serveur
app.use((req, res, next) => {
    //Ces en-têtes permettent 
    //d'accéder à l'API depuis n'importe quelle origine'*'
    res.setHeader('Access-Control-Allow-Origin', '*');
    //d'ajouter les headers mentionnés aux requêtes envoyés vers notre API(Origin, X-Requested-Widht, etc...)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //d'envoyer des requêtes de type 'get', 'post', etc...
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Pour transformer le corps de la requête en objet js 
app.use(bodyParser.json());

//Ce 3ème middleware permet de traiter les requêtes post
//Le body de la request de la route 'post' contient toutes les infos pour le nouveau 'thing' ajouté à la base de données
app.post('/api/stuff', (req, res, next) => {
    //Je supprime le faux 'id' (envoyé par le frontend) du corp de la requête qui est déjà généré par mongoDB avant de copier l'objet
    delete req.body._id;
    //Ajout du package 'body-parser' dans la console pour extraire l'objet JSON de la demande
    //Je crée une nouvelle instance du modèle 'Thing' auquel je passe toutes les infos
    const thing = new Thing({
        //Avec l'opérateur spread '...', je copie les champs du corps de la requête (title, description,...)
        ...req.body
    });
    //Pour enregistrer ce 'thing' dans la base de données, j'appelle la méthode .save 
    //Cette méthode enregistre l'objet 'Thing' dans la base de données et retourne une promesse
    thing.save()
        //Dans le .then, je renvoie une réponse à la frontend pour que la requête n'expire pas
        //Cette réponse renvoie un code 201 pour une bonne création de ressource et un message dans le json
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        //Dans le catch, je renvoie un code erreur 400
        .catch(error => res.status(400).json({ error }));
});

//Ajout d'une route 'put'
app.put('/api/stuff/:id', (req, res, next) => {
    //Avec la méthode 'updateOne', je mets à jour 
Thing.updateOne()
});

//Ajout d'une route 'get' (requête get)
//Cette route va récupérer l'id avec le paramètre de route dynamique (:) //Accès à l'id dans l'objet 'req.params.id'
app.get('/api/stuff:id', (req, res, next) => {
    //La méthode findOne retourne un seul des objets
    //Je lui passe l'objet de comparaison = l'id du thing doit être le même que le paramètre de requête
    Thing.findOne({ _id: req.params.id })
    //Je retrouve le thing dans la base de données
    .then(thing => res.status(200).json(thing))
    //code 404 pour un objet non trouvé
    .catch(error => res.status(404).json({ error }));  
});

//Avec la méthode .use, j'utilise une fonction qui reçoit requête et réponse
//J'ajoute l'argument '/api/stuff' en string à ce 4ème middleware, qui est l'url (la route) demandée par l'application frontend
app.get('/api/stuff', (req, res, next) => {
    //La méthode.find retourne une promesse avec tous les objets
    Thing.find()
    //Je demande le tableau de tous les 'thing' de la base de données et les renvoyer en réponse le tableau des 'things' depuis le base de données
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
//J'exporte l'application express pour y accéder depuis d'autres fichiers (server node)
module.exports = app;