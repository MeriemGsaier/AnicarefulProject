const express = require("express");
const connection = require("../connection");
const router = express.Router();

//à faire verification de l'authentification
var auth = require("../services/authentification");

router.get("/get", (req, res) => {
  var query =
    "select id,cin,nom,prenom,email,telephone,role,statut from utilisateur where role != 'admin'";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.patch("/updateStatut", (req, res) => {
  let user = req.body;
  console.log(user);
  var query = "update utilisateur set statut = ? where id = ?";
  connection.query(query, [user.statut, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res
          .status(404)
          .json({ message: "Id utilisateur non existant !" });
      }
      return res
        .status(200)
        .json({ message: "Statut mis à jour avec succés !" });
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/get/:userId", (req, res) => {
  const userId = req.params.userId;
  var query =
    "SELECT id,cin,nom,prenom,email,telephone,role,statut,photo FROM utilisateur WHERE id = ?";
  connection.query(query, [userId], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// get gardien lel détails postulations
router.get("/getGardien/:gardienId", (req, res) => {
  const gardienId = req.params.gardienId;
  var query =
  "select u.id,u.cin,u.nom,u.prenom,u.email,u.genre,u.adresse_domicile,u.telephone,u.photo,u.age,g.competences,g.experiences from utilisateur u, gardien g where u.id = g.id and  u.id= ?";
  connection.query(query, [gardienId], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});


router.get("/getAllVet", (req, res) => {
  var query =
    "select u.id,u.cin,u.nom,u.prenom,u.email,u.genre,u.telephone,u.photo,u.age,v.specialite,v.adresse_cabinet,v.telephone_cabinet from utilisateur u,veterinaire v where u.id=v.id";
  connection.query(query, (err, results) => {
    if (!err) {
      //console.log(results)
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});


// get vet lel détails mtaa vet fel rdv
router.get("/getVet/:vetId", (req, res) => {
  const vetId = req.params.vetId;
  var query =
  "select u.id,u.cin,u.nom,u.prenom,u.email,u.genre,u.telephone,u.photo,u.age,v.specialite,v.adresse_cabinet,v.telephone_cabinet from utilisateur u,veterinaire v where u.id=v.id and u.id = ?";
  connection.query(query, [vetId], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
