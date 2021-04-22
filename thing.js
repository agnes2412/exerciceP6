//J'importe mongoose avec la syntaxe 'require'
const mongoose = require('mongoose');
//Création d'un schéma de données contenant les champs pour chaque 'Thing' et indiquant leur type et caractère
//Je construis mon shéma de données avec la fonction .Schema (mise à dispo par le package Mongoose)
//Je passe un objet à .Schema qui va dicter les différents champs donc notre 'thing' (schéma) aura besoin
//Pas besoin de champ pour l'id qui est généré automatiquement par Mongoose
const thingSchema = mongoose.Schema({
    //J'ajoute la clé qui est le nom du champ et crée un objet pour configurer le titre de type string, description, etc...
    //'required' = c'est un champ requis, sans titre on ne peut pas enregistrer un objet dans la base
    title: { type: String, required: true },
    description: { type: String, require: true },
    imageUrl: {type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true},
});

//Pour lire et enregistrer le modèle, j'exporte le modèle terminé
//Ce modèle va nous permettre d'intéragir avec la base de données MongoDB
//1er argument passé à model : 'Thing', et en 2ème le schéma (thingSchema);
module.exports = mongoose.model('Thing', thingSchema);