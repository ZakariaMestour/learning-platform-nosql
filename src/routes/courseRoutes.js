// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Organiser les routes par ressource pour une meilleure structure.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Regrouper les routes liées à une même ressource dans un fichier.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Log global pour toutes les routes de /courses
router.use((req, res, next) => {
    console.log(`Request received in courseRoutes at ${req.path}`);
    next();
});

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/stats', (req, res, next) => {
    console.log('Request specifically for /stats received');
    next();
}, courseController.getCourseStats);
router.get('/:id', courseController.getCourse);



module.exports = router;