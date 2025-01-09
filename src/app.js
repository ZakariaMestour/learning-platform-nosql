// Question: Comment organiser le point d'entrée de l'application ?
/**Le point d'entrée de l'application doit être organisé de manière à initialiser les connexions 
 aux bases de données, configurer les middlewares Express, monter les routes, et démarrer le serveur. 
 Cela permet de centraliser la logique de démarrage de l'application et de s'assurer que tout est correctement configuré avant 
 que le serveur ne commence à écouter les requêtes. */

// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
/**La meilleure façon de gérer le démarrage de l'application est d'utiliser une fonction asynchrone (startServer) 
 * qui gère les étapes de démarrage de manière séquentielle. Cela permet de s'assurer que les connexions aux bases 
 * de données sont établies avant de monter les routes et de démarrer le serveur. En cas d'erreur, l'application peut 
 * être arrêtée proprement. */

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
    // TODO: Monter les routes
    // TODO: Démarrer le serveur
    await db.connectMongo();
    await db.connectRedis();

    app.use(express.json());
    //vérification 
    app.use('/courses', (req, res, next) => {
      console.log('Request received at /courses');
      next();
  });
  ///////////////////////////  
    
    
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);
    
    //route temporaire pour teste : j'ai eu un problème avec getStat
    app.get('/test', (req, res) => {
      res.status(200).json({ message: 'Test route is working!' });
  });
  
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  await db.mongoClient.close();
  await db.redisClient.quit();
  console.log('Connections closed');
  process.exit(0);
});

startServer();