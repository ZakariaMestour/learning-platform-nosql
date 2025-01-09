// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :Utiliser des TTL et des clés structurées pour des données valides et organisées.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :Utiliser des clés descriptives et des préfixes pour une meilleure gestion.

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl=3600) {
    // TODO: Implémenter une fonction générique de cache
    try {
      await redisClient.set(key, JSON.stringify(data), { EX: ttl });
      console.log(`Data cached with key: ${key}`);
    } catch (error) {
      console.error('Error caching data:', error);
      throw error;
    }
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData
  };