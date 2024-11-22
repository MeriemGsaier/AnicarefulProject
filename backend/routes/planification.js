// Import necessary dependencies
const express = require("express");
const connection = require("../connection");
const router = express.Router();
//à faire verification de l'authentification
var auth = require("../services/authentification");

// Ajout d'une planification
router.post("/add", (req, res, next) => {
  let planification = req.body;

  // Vérifier si la planification jour existe déjà
  let selectPlanificationQuery =
    "SELECT * FROM planification_jour WHERE date = ? AND id_veterinaire = ?";
  connection.query(
    selectPlanificationQuery,
    [planification.date, planification.id_veterinaire],
    (selectErr, selectResults) => {
      if (selectErr) {
        return res.status(500).json({
          message:
            "Erreur lors de la vérification de l'existence de la planification_jour",
          error: selectErr,
        });
      }

      if (selectResults.length == 0) {
        // Si la planification_jour n'existe pas, l'insérer
        let insertPlanificationQuery =
          "INSERT INTO planification_jour (date, id_veterinaire) VALUES (?, ?)";
        connection.query(
          insertPlanificationQuery,
          [planification.date, planification.id_veterinaire],
          (insertErr, insertResults) => {
            if (insertErr) {
              return res.status(500).json({
                message: "Erreur lors de l'ajout de la planification",
                error: insertErr,
              });
            }
            // Récupérer l'id de la planification insérée
            let id_planification = insertResults.insertId;
            insertIntervals(id_planification, planification.intervals, res);
          }
        );
      } else {
        // Si la planification_jour existe déjà, récupérer son id
        let id_planification = selectResults[0].id;
        insertIntervals(id_planification, planification.intervals, res);
      }
    }
  );
});

function insertIntervals(id_planification, intervals, res) {
  // Construire les valeurs d'insertion pour les intervalles horaires
  let intervalsValues = intervals.map((interval) => [
    interval.heure_debut,
    interval.heure_fin,
    id_planification,
  ]);
  // Vérifier si chaque intervalle horaire a une durée minimale d'une heure ou est divisible par 60 minutes
  for (let interval of intervals) {
    let start = new Date(`1970-01-01T${interval.heure_debut}`);
    let end = new Date(`1970-01-01T${interval.heure_fin}`);
    // Calculer la différence en minutes entre l'heure de début et l'heure de fin
    const differenceMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    // Vérifier si la durée est valide (au moins 60 minutes et divisible par 60)
    if (differenceMinutes < 60 || differenceMinutes % 60 !== 0) {
      console.error("La durée de l'intervalle n'est pas valide");
      // Retourner une réponse avec un code d'état 400 (Bad Request)
      return res.status(400).json({
        message:
          "L'intervalle horraire saisi n'est pas valide. Il doit être d'une durée minimale d'une heure.",
      });
    }
  }

  // Insérer les intervalles horaires dans la base de données
  let insertIntervalQuery =
    "INSERT INTO intervalle_horaire (heure_debut, heure_fin, id_planification) VALUES ?";
  connection.query(
    insertIntervalQuery,
    [intervalsValues],
    (intervalErr, intervalResults) => {
      if (intervalErr) {
        return res.status(500).json({
          message: "Erreur lors de l'ajout des intervalles horaires",
          error: intervalErr,
        });
      }

      // Insérer les sous-intervalles pour chaque intervalle horaire
      intervals.forEach((interval) => {
        // Calculer les sous-intervalles
        let subIntervalsValues = [];
        let start = new Date(`1970-01-01T${interval.heure_debut}`);
        let end = new Date(`1970-01-01T${interval.heure_fin}`);
        while (start < end) {
          let nextHalfHour = new Date(start);
          nextHalfHour.setMinutes(nextHalfHour.getMinutes() + 60);
          subIntervalsValues.push([
            start.toTimeString().slice(0, 5), // heure_debut
            nextHalfHour.toTimeString().slice(0, 5), // heure_fin
            "disponible",
            intervalResults.insertId, // Utiliser l'id de l'intervalle horaire inséré
          ]);
          start = nextHalfHour;
        }

        // Insérer les sous-intervalles dans la base de données
        let insertSubIntervalQuery =
          "INSERT INTO sous_intervalle (heure_debut, heure_fin, etat, id_intervalle) VALUES ?";
        connection.query(
          insertSubIntervalQuery,
          [subIntervalsValues],
          (subIntervalErr, subIntervalResults) => {
            if (subIntervalErr) {
              console.error(
                "Erreur lors de l'ajout des sous-intervalles :",
                subIntervalErr
              );
              return res.status(500).json({
                error: "Erreur lors de l'ajout des sous-intervalles",
              });
            }
          }
        );
      });

      // Envoyer la réponse une fois que toutes les opérations sont terminées
      return res
        .status(200)
        .json({ message: "Planification ajoutée avec succès" });
    }
  );
}

// Récupérer les planifications d'un vétérinaire
router.get("/getIntervalles/:date/:id_veterinaire", (req, res) => {
  const date = req.params.date;
  const id_veterinaire = req.params.id_veterinaire;
  var query =
    "SELECT ih.id, ih.heure_debut, ih.heure_fin, ih.id_planification, pj.date FROM intervalle_horaire ih, planification_jour pj WHERE ih.id_planification = pj.id AND pj.date = ? AND pj.id_veterinaire = ?";
  connection.query(query, [date, id_veterinaire], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Erreur lors de la récupération des données",
        details: err,
      });
    }
    // Si aucune planification n'est trouvée, renvoyer une réponse vide avec un code de statut 200
    if (results.length === 0) {
      return res.status(200).json([]); // Renvoyer une réponse vide
    }
    return res.status(200).json(results); // Renvoyer les résultats de la requête normalement
  });
});

// get intervalle by id
router.get("/getIntervalle/:id", (req, res, next) => {
  const id = req.params.id;
  var query =
    "select ih.heure_debut,ih.heure_fin,pj.date from intervalle_horaire ih, planification_jour pj where ih.id_planification = pj.id and ih.id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      // Ajustez la date en fonction du fuseau horaire de l'utilisateur ici
      // Par exemple, si la date est stockée en UTC dans la base de données, vous pouvez la convertir en date locale
      results[0].date = new Date(results[0].date).toLocaleDateString();
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});
// Modifier les planifications
router.patch("/update/:id", (req, res, next) => {
  let id = req.params.id;
  let planfication = req.body;
  console.log("id", id);
  console.log("planification body", planfication);

  // Vérifier si la planification existe pour la date et le vétérinaire donnés
  let selectPlanificationQuery =
    "SELECT id_planification FROM intervalle_horaire WHERE id = ?";
  connection.query(
    selectPlanificationQuery,
    [id],
    (selectErr, selectResults) => {
      if (selectErr) {
        return res.status(500).json({
          message: "Erreur lors de la récupération de l'ID de la planification",
          error: selectErr,
        });
      }

      if (selectResults.length === 0) {
        return res.status(404).json({
          message:
            "Planification non trouvée pour cette date et ce vétérinaire",
        });
      } else {
        const id_planification = selectResults[0].id;
        console.log("id planification :", id_planification);
        // Mettre à jour la date si une nouvelle date est fournie
        let updateDateQuery =
          "UPDATE planification_jour SET date = ? WHERE id = ?";
        connection.query(
          updateDateQuery,
          [planfication.date, id_planification],
          (updateDateErr, updateDateResults) => {
            if (updateDateErr) {
              return res.status(500).json({
                message:
                  "Erreur lors de la mise à jour de la date de la planification",
                error: updateDateErr,
              });
            }
          }
        );

        // Mettre à jour les intervalles horaires
        let updateIntervalsQuery =
          "UPDATE intervalle_horaire SET heure_debut = ?, heure_fin = ? WHERE id = ?";
        connection.query(
          updateIntervalsQuery,
          [planfication.heure_debut, planfication.heure_fin, id],
          (updateErr, updateResults) => {
            if (updateErr) {
              return res.status(500).json({
                message:
                  "Erreur lors de la mise à jour des intervalles horaires",
                error: updateErr,
              });
            }

            // Supprimer les sous-intervalles associés à cet ID d'intervalle
            let deleteSubIntervalsQuery =
              "DELETE FROM sous_intervalle WHERE id_intervalle = ?";
            connection.query(
              deleteSubIntervalsQuery,
              [id],
              (deleteErr, deleteResults) => {
                if (deleteErr) {
                  return res.status(500).json({
                    message:
                      "Erreur lors de la suppression des sous-intervalles",
                    error: deleteErr,
                  });
                }

                // Vérifier si chaque intervalle horaire a une durée minimale d'une heure ou est divisible par 60 minutes
                let start = new Date(`1970-01-01T${planfication.heure_debut}`);
                let end = new Date(`1970-01-01T${planfication.heure_fin}`);
                // Calculer la différence en minutes entre l'heure de début et l'heure de fin
                const differenceMinutes =
                  (end.getTime() - start.getTime()) / (1000 * 60);
                // Vérifier si la durée est valide (au moins 60 minutes et divisible par 60)
                if (differenceMinutes < 60 || differenceMinutes % 60 !== 0) {
                  console.error("La durée de l'intervalle n'est pas valide");
                  // Retourner une réponse avec un code d'état 400 (Bad Request)
                  return res.status(400).json({
                    message:
                      "L'intervalle horraire saisi n'est pas valide. Il doit être d'une durée minimale d'une heure.",
                  });
                }
                let subIntervalsValues = [];
                while (start < end) {
                  let nextHalfHour = new Date(start);
                  nextHalfHour.setMinutes(nextHalfHour.getMinutes() + 60);
                  subIntervalsValues.push([
                    start.toTimeString().slice(0, 5), // heure_debut
                    nextHalfHour.toTimeString().slice(0, 5), // heure_fin
                    "disponible",
                    id, // Utiliser l'id de l'intervalle horaire mis à jour
                  ]);
                  start = nextHalfHour;
                }

                let insertSubIntervalQuery =
                  "INSERT INTO sous_intervalle (heure_debut, heure_fin, etat, id_intervalle) VALUES ?";
                connection.query(
                  insertSubIntervalQuery,
                  [subIntervalsValues],
                  (insertErr, insertResults) => {
                    if (insertErr) {
                      console.error(
                        "Erreur lors de l'ajout des sous-intervalles :",
                        insertErr
                      );
                      return res.status(500).json({
                        message:
                          "Erreur lors de l'ajout des nouveaux sous-intervalles",
                        error: insertErr,
                      });
                    }

                    return res.status(200).json({
                      message: "Planification mise à jour avec succés.",
                    });
                  }
                );
              }
            );
          }
        );
      }
    }
  );
});

// Supprimer un intervalle horaire
router.delete("/deleteIntervalle/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("id_intervalle_del", id);
  let selectPlanificationQuery =
    "SELECT id_planification FROM intervalle_horaire WHERE id = ? ";
  connection.query(
    selectPlanificationQuery,
    [id],
    (selectErr, selectResults) => {
      if (selectErr) {
        return res.status(500).json({
          message: "Erreur lors de la récupération de l'ID de la planification",
          error: selectErr,
        });
      }

      // Vérifier si une planification a été trouvée
      if (selectResults.length === 0) {
        return res.status(404).json({
          message: "Planification non trouvée pour cet intervalle horaire",
        });
      }

      const id_planification = selectResults[0].id_planification;
      console.log("id planification del", id_planification);
      var deleteSubIntervals =
        "DELETE FROM sous_intervalle WHERE id_intervalle = ?";

      connection.query(deleteSubIntervals, [id], (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res
              .status(404)
              .json({ message: "ID intervalle non existant" });
          } else {
            console.log("sous intervalles horraires supprimés");
            // Supprimer  l'intervalle horaire
            var query = "DELETE FROM intervalle_horaire WHERE id = ?";
            connection.query(
              query,
              [id],
              (errIntervals, resultsSubIntervals) => {
                if (errIntervals) {
                  console.error("Error deleting intervals:", errIntervals);
                  return res.status(500).json(errIntervals);
                } else {
                  // Vérifier s'il existe d'autres intervalles horaires associés à la même planification
                  var existPlanification =
                    "SELECT * FROM intervalle_horaire WHERE id_planification = ?";
                  connection.query(
                    existPlanification,
                    [id_planification],
                    (selectErrPlanification, selectResultsPlanification) => {
                      if (selectErrPlanification) {
                        return res.status(500).json({
                          message:
                            "Erreur lors de la récupération de l'ID de la planification",
                          error: selectErrPlanification,
                        });
                      }

                      console.log(
                        "Nombre d'intervalle horaires associés à la même planification:",
                        selectResultsPlanification.length
                      );

                      // S'il n'y a plus d'autres intervalles horaires associés à la même planification, supprimer la planification
                      if (selectResultsPlanification.length === 0) {
                        var deletePlanification =
                          "DELETE FROM planification_jour WHERE id = ?";
                        connection.query(
                          deletePlanification,
                          [id_planification],
                          (errPlanification, resultsPlanification) => {
                            if (errPlanification) {
                              console.error(
                                "Error deleting planification:",
                                errPlanification
                              );
                              return res.status(500).json(errPlanification);
                            } else {
                              return res.status(200).json({
                                message: "Intervalle supprimé avec succès",
                              });
                            }
                          }
                        );
                      } else {
                        return res.status(200).json({
                          message: "Intervalle supprimé avec succès",
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        } else {
          return res.status(500).json(err);
        }
      });
    }
  );
});

// liste des sous-intervalles par vétérinaire
router.get("/getSousIntervalles/:id_vet", (req, res, next) => {
  const id_vet = req.params.id_vet;
  var query =
    "select si.id,si.heure_debut,si.heure_fin,si.id_intervalle,si.etat,pl.date,pl.id_veterinaire from sous_intervalle si, intervalle_horaire ih, planification_jour pl where si.id_intervalle = ih.id and ih.id_planification = pl.id and pl.id_veterinaire = ?";
  connection.query(query, [id_vet], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

// liste des sous-intervalles par id intervalle horraire
router.get("/sousIntervalles/:id_intervalle", (req, res, next) => {
  const id_intervalle = req.params.id_intervalle;
  var query =
    "select si.id,si.heure_debut,si.heure_fin,si.id_intervalle,si.etat,pl.date from sous_intervalle si, intervalle_horaire ih, planification_jour pl where si.id_intervalle = ih.id and ih.id_planification = pl.id and ih.id = ?";
  connection.query(query, [id_intervalle], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
