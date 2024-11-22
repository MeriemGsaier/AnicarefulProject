const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../connection');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM utilisateur WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur lors de la vérification des informations d\'identification' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }

      const user = results[0];

      // Vérification du mot de passe avec bcrypt
      const passwordMatch = await bcrypt.compare(password, user.mot_de_passe);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Identifiants invalides' });
      }

      // Vérification du statut de l'utilisateur
      if (user.statut !== 'true') {
        return res.status(401).json({ message: 'Votre compte est inactif. Veuillez contacter un administrateur.' });
      }

      const userId = user.id;
      const role = user.role;
      const token = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });

      res.status(200).json({ token, role });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.signup = async (req, res) => {
  try {
    const { cin, nom, prenom, email, motDePasse, role = 'proprietaire' } = req.body;
    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const checkQuery = 'SELECT * FROM utilisateur WHERE email = ?';
    connection.query(checkQuery, [email], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Erreur lors de la vérification de l\'email' });
      }
      if (results.length > 0) {
        return res.status(409).json({ message: 'Un utilisateur avec cet email existe déjà' });
      }
      const insertQuery = 'INSERT INTO utilisateur (cin, nom, prenom, email, mot_de_passe, role, statut) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(insertQuery, [cin, nom, prenom, email, hashedPassword, role, 'true'], (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        }
        const userId = results.insertId;
        let insertionError = false;
        if (role === 'gardien') {
          const competences = req.body.competences || '';
          const experiences = req.body.experiences || '';
          const gardienQuery = 'INSERT INTO gardien (id, competences, experiences) VALUES (?, ?, ?)';
          connection.query(gardienQuery, [userId, competences, experiences], (error, results) => {
            if (error) {
              insertionError = true;
              return res.status(500).json({ message: 'Erreur lors de l\'insertion du gardien' });
            }
          });
        } else if (role === 'veterinaire') {
          const specialite = req.body.specialite || 'Généraliste';
          const adresse_cabinet = req.body.adresse_cabinet || '';
          const telephone_cabinet = req.body.telephone_cabinet || '00000000';
          const veterinaire = 'INSERT INTO veterinaire (id, specialite, adresse_cabinet, telephone_cabinet) VALUES (?, ?, ?, ?)';
          connection.query(veterinaire, [userId, specialite, adresse_cabinet, telephone_cabinet], (error, results) => {
            if (error) {
              insertionError = true;
              return res.status(500).json({ message: 'Erreur lors de l\'insertion du vétérinaire' });
            }
          });
        } else if (role === 'proprietaire') {
          const proprietaireQuery = 'INSERT INTO proprietaire (id) VALUES (?)';
          connection.query(proprietaireQuery, [userId], (error, results) => {
            if (error) {
              insertionError = true;
              return res.status(500).json({ message: 'Erreur lors de l\'insertion du propriétaire' });
            }
          });
        }
        if (!insertionError) {
          const token = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
          res.status(201).json({ token, role });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};