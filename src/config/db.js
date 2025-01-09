// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Centraliser la gestion des connexions pour faciliter la réutilisation et la maintenance.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse :  Utiliser des signaux système (SIGTERM) pour fermer les connexions avant l'arrêt.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try {
    mongoClient = new MongoClient(config.mongodb.uri);
    await mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try {
    redisClient = redis.createClient({ url: config.redis.uri });
    redisClient.on('error', (err) => {
      console.error('Redis error:', err);
    });
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    process.exit(1);
  }
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getDb: () => db,  // Ajoutez cette fonction
  redisClient,
};