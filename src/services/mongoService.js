// Question: Pourquoi créer des services séparés ?
// Réponse: Centraliser la logique réutilisable pour éviter la duplication et faciliter les tests.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    const collection = db.collection(collectionName);
    const document = await collection.findOne({ _id: new ObjectId(id) });
    return document;
  } catch (error) {
    console.error(`Error finding document in ${collectionName}:`, error);
    throw error;
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById
};