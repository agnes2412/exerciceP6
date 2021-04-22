//Création d'un programme qui va écouter, attendre des requêtes http et qui va y répondre
//J'importe le package http de Node (require = commande pour importer le package)

const http = require('http');
//J'importe l'application express 'app'
const app = require('./app');

//Renvoi un port valide. 
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
//Port sur lequel l'application va tourner avec la méthode .set
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Permet de rechercher les différentes erreurs et de les gérer.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = serve.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'isready in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Avec l'accès à l'objet 'http', je crée un serveur avec la méthode 'create server'
//Cette méthode prend comme argument la fonction qui sera appelée à chaque requête reçue par le serveur
//Je passe l'application express 'app' à mon serveur, qui va recevoir la question et la réponse 
const server = http.createServer(app);

server.on('error', errorHandler);
//Ecouteur d'évènement 
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
});
//Le serveur est prêt mais il doit écouter, attendre les requêtes envoyées
//Avec la méthode 'listen' avec le numéro du port que l'on veut écouter (par défaut 3000)
//Si le port 3000 n'est pas disponible, on utilise une variable environnement
//Si l'environnement sur lequel tourne mon serveur m'envoie un port à utiliser = 'process.env.PORT' sinon = '3000'
server.listen(port);
//Je fais un node server