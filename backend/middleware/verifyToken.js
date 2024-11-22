const jwt = require('jsonwebtoken');

// Importer la clé secrète à partir d'une variable d'environnement ou d'un fichier de configuration
const JWT_SECRET = process.env.ACCESS_TOKEN || 'votre_cle_secrete';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Jeton d\'authentification manquant' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Jeton d\'authentification invalide' });
    }

    req.user = decoded; // Ajoute les données décodées du jeton à l'objet req
    next();
  });
};

module.exports = verifyToken;