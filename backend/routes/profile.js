const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Middleware pour vérifier l'authentification de l'utilisateur
const authMiddleware = require('../middleware/verifyToken');
const authorize = require('../middleware/authorizationMiddleware');

// Route pour récupérer les informations du profil
router.get('/get-profile', authMiddleware, authorize(['admin', 'proprietaire', 'veterinaire', 'gardien']), profileController.getProfile);

// Route pour compléter le profil de l'utilisateur
router.put('/complete-profile', authMiddleware, authorize(['admin', 'proprietaire', 'veterinaire', 'gardien']), profileController.completeProfile);

// Route pour mettre à jour le profil
router.put('/update-profile', authMiddleware, authorize(['admin', 'proprietaire', 'veterinaire', 'gardien']), profileController.updateProfile);

// Route pour mettre à jour le mot de passe
router.put('/update-password', authMiddleware, authorize(['admin', 'proprietaire', 'veterinaire', 'gardien']), profileController.updatePassword);

module.exports = router;
