const jwt = require('jsonwebtoken');
const connection = require('../connection');
const bcrypt = require('bcryptjs');


exports.getProfile = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let query;

    if (role === 'gardien') {
      query = 'SELECT u.id, u.cin, u.nom, u.prenom, u.email, u.genre, u.adresse_domicile, u.telephone, u.age, u.photo, g.competences, g.experiences FROM utilisateur u JOIN gardien g ON u.id = g.id WHERE u.id = ?';
    } else if (role === 'veterinaire') {
      query = 'SELECT u.id, u.cin, u.nom, u.prenom, u.email, u.genre, u.adresse_domicile, u.telephone, u.age, u.photo, v.specialite, v.adresse_cabinet, v.telephone_cabinet FROM utilisateur u JOIN veterinaire v ON u.id = v.id WHERE u.id = ?';
    } else {
      // Cas du propriétaire ou de l'admin
      query = 'SELECT id, cin, nom, prenom, email, genre, adresse_domicile, telephone, age, photo FROM utilisateur WHERE id = ?';
    }

    connection.query(query, [userId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Profil non trouvé' });
      }

      res.status(200).json(results[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '../frontend/src/assets/images/uploads',
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) 
    }
});

const upload = multer({ storage: storage });

exports.completeProfile = async (req, res) => {
  try {
    const { userId, role } = req.user;

    upload.single('photo')(req, res, function (err) {
      let user = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Une erreur est survenue lors du téléchargement de la photo' });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors du traitement de la photo' });
      }

      const photo = req.file ? req.file.filename : undefined;

      let query, values;

      if (role === 'gardien') {
        query = 'UPDATE utilisateur u JOIN gardien g ON u.id = g.id SET u.genre = ?, u.adresse_domicile = ?, u.telephone = ?, u.age = ?, u.photo = ?, g.competences = ?, g.experiences = ? WHERE u.id = ?';
        values = [user.genre, user.adresse_domicile, user.telephone, user.age, photo, user.competences, user.experiences, userId];
      } else if (role === 'veterinaire') {
        query = 'UPDATE utilisateur u JOIN veterinaire v ON u.id = v.id SET u.genre = ?, u.adresse_domicile = ?, u.telephone = ?, u.age = ?, u.photo = ?, v.specialite = ?, v.adresse_cabinet = ?, v.telephone_cabinet = ? WHERE u.id = ?';
        values = [user.genre, user.adresse_domicile, user.telephone, user.age, photo, user.specialite, user.adresse_cabinet, user.telephone_cabinet, userId];
      } else {
        // Cas du propriétaire ou de l'admin
        query = 'UPDATE utilisateur SET genre = ?, adresse_domicile = ?, telephone = ?, age = ?, photo = ? WHERE id = ?';
        values = [user.genre, user.adresse_domicile, user.telephone, user.age, photo, userId];
      }

      connection.query(query, values, (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
        }

        res.status(200).json({ message: 'Profil mis à jour avec succès' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




exports.updateProfile = async (req, res) => {
  try {
    const { userId, role } = req.user;

    upload.single('photo')(req, res, function (err) {
      let user = req.body;
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: 'Une erreur est survenue lors du téléchargement de la photo' });
      } else if (err) {
        return res.status(500).json({ message: 'Une erreur est survenue lors du traitement de la photo' });
      }

      const photo = req.file ? req.file.filename : undefined;

      let query, values;

      if (role === 'gardien') {
        query = 'UPDATE utilisateur u JOIN gardien g ON u.id = g.id SET u.nom = ?, u.prenom = ?, u.email = ?, u.genre = ?, u.adresse_domicile = ?, u.telephone = ?, u.age = ?, u.photo = ?, g.competences = ?, g.experiences = ? WHERE u.id = ?';
        values = [user.nom, user.prenom, user.email, user.genre, user.adresse_domicile, user.telephone, user.age, photo, user.competences, user.experiences, userId];
      } else if (role === 'veterinaire') {
        query = 'UPDATE utilisateur u JOIN veterinaire v ON u.id = v.id SET u.nom = ?, u.prenom = ?, u.email = ?, u.genre = ?, u.adresse_domicile = ?, u.telephone = ?, u.age = ?, u.photo = ?, v.specialite = ?, v.adresse_cabinet = ?, v.telephone_cabinet = ? WHERE u.id = ?';
        values = [user.nom, user.prenom, user.email, user.genre, user.adresse_domicile, user.telephone, user.age, photo, user.specialite, user.adresse_cabinet, user.telephone_cabinet, userId];
      } else {
        // Cas du propriétaire ou de l'admin
        query = 'UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, genre = ?, adresse_domicile = ?, telephone = ?, age = ?, photo = ? WHERE id = ?';
        values = [user.nom, user.prenom, user.email, user.genre, user.adresse_domicile, user.telephone, user.age, photo, userId];
      }

      connection.query(query, values, (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
        }

        res.status(200).json({ message: 'Profil mis à jour avec succès' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    // Récupérer le mot de passe stocké dans la base de données
    const query = 'SELECT mot_de_passe FROM utilisateur WHERE id = ?';
    connection.query(query, [userId], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur lors de la vérification du mot de passe' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      const storedPassword = results[0].mot_de_passe;

      // Vérifier si l'ancien mot de passe correspond au mot de passe stocké en utilisant bcrypt
      const passwordMatch = await bcrypt.compare(oldPassword, storedPassword);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Ancien mot de passe incorrect' });
      }

      // Hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe dans la base de données
      const updateQuery = 'UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?';
      connection.query(updateQuery, [hashedPassword, userId], (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe' });
        }

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};