const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const bodyParser = require("body-parser");
process.env.TZ = "Europe/Paris";

const app = express();

const categorieRoute = require("./routes/categorie");
const produitRoute = require("./routes/produit");
const utilisateurRoute = require("./routes/utilisateur");
const commandeRoute = require("./routes/commande");
const contenuInformatifRoute = require("./routes/contenu_informatif");
const animalRoute = require("./routes/animaux");
const gardeRoute = require("./routes/garde");
const rendezVousRoute = require("./routes/rendez_vous");
const authentificationRoute = require("./routes/authentification");
const profileRoute = require("./routes/profile");
const planificationRoute = require("./routes/planification");
const  contact  = require("./routes/contact");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.use("/categorie", categorieRoute);
app.use("/produit", produitRoute);
app.use("/utilisateur", utilisateurRoute);
app.use("/commande", commandeRoute);
app.use("/contenu_informatif", contenuInformatifRoute);
app.use("/animal", animalRoute);
app.use("/garde", gardeRoute);
app.use("/rendezVous", rendezVousRoute);
app.use("/authentification", authentificationRoute);
app.use("/profile", profileRoute);
app.use("/planification", planificationRoute);
app.use("/contact", contact);

module.exports = app;
