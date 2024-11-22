const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.ACCESS_TOKEN || 'votre_cle_secrete';

const authorize = (allowedRoles) => {
    return (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'Jeton d\'authentification manquant' });
      }
  
      const token = authHeader.split(' ')[1];
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Jeton d\'authentification invalide' });
        }
  
        // Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
        if (!allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ message: 'Accès non autorisé' });
        }
  
        req.user = decoded;
        next();
      });
    };
  };
  
  module.exports = authorize;