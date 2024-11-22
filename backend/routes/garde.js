const express = require("express");
const connection = require("../connection");
const router = express.Router();
const nodemailer = require("nodemailer");

//ajout d'une demande de garde
router.post("/add", (req, res, next) => {
  let garde = req.body;
  query =
    "insert into garde (date_debut,date_fin,heure_deb,heure_fin,remarque,id_animal,id_proprietaire,type_garde) values(?,?,?,?,?,?,?,?)";
  connection.query(
    query,
    [
      garde.date_debut,
      garde.date_fin,
      garde.heure_deb,
      garde.heure_fin,
      garde.remarque,
      garde.id_animal,
      garde.id_proprietaire,
      garde.type_garde,
    ],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: "Grade ajouté avec succés" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

// liste des demandes de garde
router.get("/get/:id_prop", (req, res, next) => {
  const id_prop = req.params.id_prop;
  var query =
    "select g.id,g.date_debut,g.date_fin,g.heure_deb,g.heure_fin,g.remarque,g.type_garde,g.id_proprietaire,a.photo,a.nom from garde g, animal a where g.id_animal = a.id and g.id_proprietaire = ?";
  connection.query(query, [id_prop], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// get all gardes
router.get("/getAll", (req, res, next) => {
  const query = `
    SELECT 
      g.id, g.date_debut, g.date_fin, g.heure_deb, g.heure_fin, g.remarque,
      a.nom AS nom_animal, a.espece, a.race, a.age, a.sexe, a.poids, a.information_medicale, a.regime_alimentaire,a.photo,
      t.libelle, g.id_proprietaire,
      p.adresse_domicile, p.nom, p.prenom 
    FROM 
      garde g, animal a, typegarde t, utilisateur p 
    WHERE 
      g.id_animal = a.id AND 
      g.type_garde = t.id AND 
      p.id = g.id_proprietaire`;

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// get garde by id
router.get("/getById/:id", (req, res, next) => {
  const id = req.params.id;
  var query =
    "select g.date_debut,g.date_fin,g.heure_deb,g.heure_fin,g.remarque,a.nom as nom_animal,a.espece,a.race,a.age,a.sexe,a.poids,a.information_medicale,a.regime_alimentaire,a.photo,t.libelle,g.id_proprietaire,p.adresse_domicile,p.nom,p.prenom from garde g, animal a,typegarde t,utilisateur p where g.id_animal=a.id and g.type_garde = t.id and p.id = g.id_proprietaire and g.id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

// modifier une demande de garde
router.patch("/update/:id", (req, res, next) => {
  let garde = req.body;
  let id = req.params.id;
  var query =
    "update garde set date_debut = ?,date_fin=?,heure_deb=?,heure_fin=?,remarque=?,id_animal=?,type_garde=? where id = ? ";
  connection.query(
    query,
    [
      garde.date_debut,
      garde.date_fin,
      garde.heure_deb,
      garde.heure_fin,
      garde.remarque,
      garde.id_animal,
      garde.type_garde,
      id,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "id non existant" });
        } else {
          return res
            .status(200)
            .json({ message: "Garde mis à jour avec succés" });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

// supprimer une demande de garde
router.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  var query = "delete from garde where id =?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "id Garde non existant" });
      } else {
        return res.status(200).json({ message: "Garde supprimé avec succés" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// postuler pour une garde
router.post("/postuler/:id", (req, res, next) => {
  const id_garde = req.params.id;
  const id_gardien = req.body.id_gardien;

  if (!id_gardien || !id_garde) {
    return res.status(400).json({ message: "Les données sont incomplètes." });
  }
  const query =
    "INSERT INTO demandes_garde (id_gardien, id_garde,etat) VALUES (?, ?,?)";
  connection.query(
    query,
    [id_gardien, id_garde, "en attente"],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de l'insertion de la candidature:", err);
        return res.status(500).json({
          message:
            "Une erreur s'est produite lors de l'insertion de la candidature.",
        });
      }
      return res
        .status(200)
        .json({ message: "Candidature ajoutée avec succès." });
    }
  );
});

//Récuperer les informations de postulations
// liste des demandes de garde
router.get("/getPostulations/:id_garde", (req, res, next) => {
  const id_garde = req.params.id_garde;
  var query =
    "select u.id,u.cin,u.nom,u.prenom,u.email,u.genre,u.adresse_domicile,u.telephone,u.photo,u.age,g.competences,g.experiences from utilisateur u, gardien g,demandes_garde d where u.id = g.id and g.id = d.id_gardien and d.id_garde = ?";
  connection.query(query, [id_garde], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// Créer un transporter SMTP réutilisable en utilisant les informations du service
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mahmoud.lassoued@esen.tn",
    pass: "vrtn dvxq wluk atuw",
  },
});

// accepter une candidature de garde
router.patch("/accepterCand/:idGard/:idGardien", (req, res, next) => {
  const idGard = req.params.idGard;
  const idGardien = req.params.idGardien;
  var query =
    "update demandes_garde set etat = 'accepte' where id_gardien =? and id_garde = ?";
  connection.query(query, [idGardien, idGard], async (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Candidature non existant" });
      } else {
        try {
          // Récupérer l'e-mail du gardien
          const userData = await getGardienEmail(idGardien);
          // console.log(userData)
          const gardeData = await getGardeDetails(idGard);
          // console.log(gardeData)
          // Formatage de la date au format dd-mm-yyyy
          const debutDate = new Date(gardeData.date_debut).toLocaleDateString(
            "fr-FR"
          );
          const finDate = new Date(gardeData.date_fin).toLocaleDateString(
            "fr-FR"
          );
          // Envoyer un e-mail si l'utilisateur existe
          if (userData && userData.email) {
            const mailOptions = {
              from: "mahmoud.lassoued@esen.tn",
              to: userData.email,
              subject: "Candidature acceptée pour le service de garde",
              html:
                "<p>Bonjour,</p><p>Félicitations, votre candidature pour le service de garde de " +
                debutDate +
                " jusquà " +
                finDate +
                " de l'heure " +
                gardeData.heure_deb +
                " jusquà " +
                gardeData.heure_fin +
                " a été acceptée.</p></p><p>Cordialement</p><p>Anicareful</p>",
            };

            // Envoyer l'e-mail
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Erreur lors de l'envoi de l'e-mail:", error);
              } else {
                console.log("E-mail envoyé avec succès:", info.response);
              }
            });
          }
          // Répondre avec succès si tout s'est bien passé
          return res
            .status(200)
            .json({ message: "Candidature acceptée avec succès" });
        } catch (error) {
          console.log("Erreur:", error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'envoi de l'e-mail" });
        }
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

// Fonction pour récupérer l'e-mail du gardien
async function getGardienEmail(idGardien) {
  return new Promise((resolve, reject) => {
    const query = "SELECT email FROM utilisateur WHERE id = ?";
    connection.query(query, [idGardien], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Fonction pour récupérer les données du garde
async function getGardeDetails(idGarde) {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT date_debut, date_fin,heure_deb,heure_fin FROM garde WHERE id = ?";
    connection.query(query, [idGarde], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}

// refuser une candidature de garde
router.patch("/refuserCand/:idGard/:idGardien", (req, res, next) => {
  const idGard = req.params.idGard;
  const idGardien = req.params.idGardien;
  var query =
    "update demandes_garde set etat = 'refuse' where id_gardien =? and id_garde = ?";
  connection.query(query, [idGardien, idGard], async (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "Candidature non existant" });
      } else {
        try {
          // Récupérer l'e-mail du gardien
          const userData = await getGardienEmail(idGardien);
          // console.log(userData)
          const gardeData = await getGardeDetails(idGard);
          // console.log(gardeData)
          // Formatage de la date au format dd-mm-yyyy
          const debutDate = new Date(gardeData.date_debut).toLocaleDateString(
            "fr-FR"
          );
          const finDate = new Date(gardeData.date_fin).toLocaleDateString(
            "fr-FR"
          );
          // Envoyer un e-mail si l'utilisateur existe
          if (userData && userData.email) {
            const mailOptions = {
              from: "mahmoud.lassoued@esen.tn",
              to: userData.email,
              subject: "Candidature refusée pour le service de garde",
              html:
                "<p>Bonjour,</p><p>Malheureusement, votre candidature pour le service de garde de " +
                debutDate +
                " jusquà " +
                finDate +
                " de l'heure " +
                gardeData.heure_deb +
                " jusquà " +
                gardeData.heure_fin +
                " a été refusée.</p><p>Cordialement</p><p>Anicareful</p>",
            };

            // Envoyer l'e-mail
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log("Erreur lors de l'envoi de l'e-mail:", error);
              } else {
                console.log("E-mail envoyé avec succès:", info.response);
              }
            });
          }
          // Répondre avec succès si tout s'est bien passé
          return res
            .status(200)
            .json({ message: "Candidature acceptée avec succès" });
        } catch (error) {
          console.log("Erreur:", error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'envoi de l'e-mail" });
        }
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/getTypeGarde", (req, res, next) => {
  var query = "select * from typegarde order by libelle";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
