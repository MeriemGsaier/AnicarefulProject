const express = require("express");
const connection = require("../connection");
const router = express.Router();
const nodemailer = require("nodemailer");

//ajout d'un rendez-vous
router.post("/add", (req, res, next) => {
  let rdv = req.body;
  console.log("rendezvousbody", rdv);
  const formattedDate = new Date(rdv.date).toISOString().split('T')[0];
  query = "insert into rendezvous (id_proprietaire,id_sousIntervalle,date,heure) values(?,?,?,?)";
  connection.query(
    query,
    [rdv.id_proprietaire, rdv.id_intervalle, formattedDate, rdv.heure],
    (err, results) => {
      if (!err) {
        updateQuery =
          "update sous_intervalle set etat = 'indisponible' where id = ?";
        connection.query(updateQuery, [rdv.id_intervalle], (err, results) => {
          if (!err) {
            return res.status(200).json({
              message: "rendez-vous ajouté avec succés",
            });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res.status(500).json({
          message: "Un problème est survenu lors de la prise du rendez-vous.",
        });
      }
    }
  );
});
// router.get("/getByuser/:id_user", (req, res, next) => {
//   const id_user = req.params.id_user;
//   var query =
//     "select id,titre,date,description,photo,etat,id_utilisateur from contenu_informatif where id_utilisateur = ?";
//   connection.query(query, [id_user], (err, results) => {
//     if (!err) {
//       return res.status(200).json(results);
//     } else {
//       return res.status(500).json(err);
//     }
//   });
// });
router.get("/getAll/:id_user", (req, res, next) => {
  const id_user = req.params.id_user;
  const query =
    "SELECT r.id_proprietaire, DATE_FORMAT(r.date, '%Y-%m-%d') as date, r.heure, r.id_sousIntervalle, p.nom, p.prenom, p.email, p.cin, p.telephone,ih.id, pj.id_veterinaire FROM rendezvous r, utilisateur p, sous_intervalle i, planification_jour pj, intervalle_horaire ih WHERE p.id = r.id_proprietaire AND r.id_sousIntervalle = i.id AND ih.id_planification = pj.id AND ih.id = i.id_intervalle AND pj.id_veterinaire = ?;";

  connection.query(query, [id_user], (err, results) => {
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

// annuler un rendez-vous
router.delete("/annuler/:id_prop/:id_sousIntervalle", (req, res, next) => {
  const id_prop = req.params.id_prop;
  const id_sousIntervalle = req.params.id_sousIntervalle;
  console.log("id_prop : ", id_prop);
  console.log("id_sousIntervalle  : ", id_sousIntervalle);
  var query =
    "DELETE FROM rendezvous WHERE id_proprietaire = ? AND id_sousIntervalle = ?";
  connection.query(
    query,
    [id_prop, id_sousIntervalle],
    async (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "Rendez-vous non existant" });
        } else {
          try {
            // Récupérer l'e-mail du gardien
            const userData = await getPropDetails(id_prop);
            console.log(userData);
            const rdvData = await getRdvDetails(id_prop, id_sousIntervalle);
            //console.log(rdvData);
            // Formatage de la date au format dd-mm-yyyy
            //const date = new Date(rdvData.date).toLocaleDateString("fr-FR");
            const vetData = await getVetDetails(id_sousIntervalle);
            console.log(vetData);
            // Envoyer un e-mail si l'utilisateur existe
            if (userData && userData.email) {
              const mailOptions = {
                from: "mahmoud.lassoued@esen.tn",
                to: userData.email,
                subject: "Rendez-vous annulé",
                html:
                  "<p>Bonjour cher " +
                  userData.nom +
                  " " +
                  userData.prenom +
                  //userData.prenom +
                  " " +
                  //userData.nom +
                  ",</p><p>Nous vous informons malheureusement que votre rendez-vous chez le vétérinaire " +
                  vetData.nom +
                  " " +
                  vetData.prenom +
                  //date +
                  "" +
                  //rdvData.heure +
                  " a été annulé.</p><p>Cordialement,</p><p>Equipe Anicareful</p>",
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
              .json({ message: "Rendez-vous annulé  avec succès" });
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
    }
  );
});

// Fonction pour récupérer l'e-mail du proprietaire
async function getPropDetails(idProp) {
  return new Promise((resolve, reject) => {
    const query = "SELECT nom,prenom,email FROM utilisateur WHERE id = ?";
    connection.query(query, [idProp], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  });
}
// Fonction pour récupérer les données du rednez-vous
async function getRdvDetails(idProp, id_sousIntervalle) {
  console.log(idProp, id_sousIntervalle);
  return new Promise((resolve, reject) => {
    const query =
      "SELECT date,heure FROM rendezvous WHERE id_proprietaire = ? and id_sousIntervalle = ?";
    connection.query(query, [idProp, id_sousIntervalle], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("ena");
        console.log(results[0]);
        resolve(results[0]);
      }
    });
  });
}

// Fonction pour récupérer les données du vétérinaire
async function getVetDetails(id_sousIntervalle) {
  console.log(id_sousIntervalle);
  return new Promise((resolve, reject) => {
    const query =
      "SELECT nom,prenom FROM utilisateur u, planification_jour pj,intervalle_horaire ih,sous_intervalle si WHERE u.id = pj.id_veterinaire and pj.id = ih.id_planification and ih.id = si.id_intervalle and si.id = ?";
    connection.query(query, [id_sousIntervalle], (err, results) => {
      if (err) {
        reject(err);
      } else {
        console.log("ena");
        console.log(results[0]);
        resolve(results[0]);
      }
    });
  });
}
// liste des rendez-vous par intervalle horraire
router.get("/getRdv/:id_intervalle", (req, res, next) => {
  const id_intervalle = req.params.id_intervalle;
  console.log(id_intervalle);

  // Obtenir tous les sous-intervalles associés à l'intervalle horaire spécifié
  const querySousIntervalles =
    "SELECT id FROM sous_intervalle WHERE id_intervalle = ?";
  connection.query(
    querySousIntervalles,
    [id_intervalle],
    (err, sousIntervalles) => {
      if (err) {
        return res.status(500).json(err);
      }
      // Extraire les IDs des sous-intervalles
      const idSousIntervalle = sousIntervalles.map(
        (sousIntervalle) => sousIntervalle.id
      );
      console.log("idSous", idSousIntervalle);

      // Obtenir tous les rendez-vous associés aux sous-intervalles obtenus
      const query = "SELECT * FROM rendezvous WHERE id_sousIntervalle IN (?)";
      connection.query(query, [idSousIntervalle], (err, results) => {
        if (!err) {
          return res.status(200).json(results);
        } else {
          return res.status(500).json(err);
        }
      });
    }
  );
});

//suprrimer un rdv selon intervalle horraire
router.delete("/delete/:id_intervalle", (req, res, next) => {
  const id_intervalle = req.params.id_intervalle;
  console.log("id_intervalle", id_intervalle);

  // Obtenir tous les sous-intervalles associés à l'intervalle horaire spécifié
  const querySousIntervalles =
    "SELECT id FROM sous_intervalle WHERE id_intervalle = ?";
  connection.query(
    querySousIntervalles,
    [id_intervalle],
    (err, sousIntervalles) => {
      if (err) {
        return res.status(500).json(err);
      }

      // Extraire les id des sous-intervalles
      const idSousIntervalle = sousIntervalles.map(
        (sousIntervalle) => sousIntervalle.id
      );
      // Supprimer les rendez-vous associés aux sous-intervalles obtenus
      const queryDeleteRendezVous =
        "DELETE FROM rendezvous WHERE id_sousIntervalle IN (?)";
      connection.query(
        queryDeleteRendezVous,
        [idSousIntervalle],
        (err, results) => {
          if (err) {
            return res.status(500).json(err);
          }

          if (results.affectedRows == 0) {
            return res.status(404).json({
              message: "Aucun rendez-vous trouvé pour cet intervalle horaire",
            });
          } else {
            return res.status(200).json({
              message: "Tous les rendez-vous ont été supprimés avec succès",
            });
          }
        }
      );
    }
  );
});

module.exports = router;

router.get("/getAllR/:id_user", (req, res, next) => {
  const id_user = req.params.id_user;
  const query =
    "SELECT r.date, r.heure, r.id_sousIntervalle FROM rendezvous r WHERE r.id_proprietaire = ?";

  connection.query(query, [id_user], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});