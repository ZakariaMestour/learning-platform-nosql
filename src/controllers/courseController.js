// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Les routes définissent les points d'entrée, les contrôleurs gèrent la logique métier.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :Meilleure organisation, maintenance et réutilisation du code.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable
  try {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    const course = { title, description };
    const result = await db.getDb().collection('courses').insertOne(course);
    res.status(201).json({ id: result.insertedId, ...course });
} catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
}

}
async function getCourse(req, res) {
  try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid course ID' });
         
      }

      const course = await db.getDb().collection('courses').findOne({ _id: new ObjectId(id) });
      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json(course);
  } catch (error) {
      console.error('Error retrieving course:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCourseStats(req, res) {
    try {
        console.log('Route /courses/stats accessed');
        const count = await db.getDb().collection('courses').countDocuments();
        console.log('Total courses:', count);
        res.status(200).json({ totalCourses: count });
      } catch (error) {
        console.error('Error retrieving course stats:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};