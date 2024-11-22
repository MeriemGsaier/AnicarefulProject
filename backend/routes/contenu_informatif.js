const express = require("express");
const connection = require("../connection");
const router = express.Router();

//à faire verification de l'authentification
var auth = require("../services/authentification");


var auth = require ('../services/authentification');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: '../frontend/src/assets/images/uploads',
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`) 
    }
  });

const upload = multer({ storage: storage });


router.get('/get',(req,res,next)=>{
    var query = "select c.id,u.nom,u.prenom,c.titre,c.description,c.date,c.photo,c.etat from contenu_informatif c,utilisateur u where c.id_utilisateur = u.id";
    connection.query(query,(err,results)=>{
        if(!err)
        {
            return res.status(200).json(results);
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


router.patch('/approuver/:id',(req,res) =>{
    const id = req.params.id;
    var query = "update contenu_informatif set etat = 'approuve' where id = ?";
    connection.query(query,[id],(err,results)=> {
        if(!err){
            if(results.affectedRows == 0)
            {
                return  res.status(404).json({message:"Id contenu non existant !"}); 
            }
            return  res.status(200).json({message:"Contenu approuvée avec succés !"}); 
        }
        else
        {
            return res.status(500).json(err); 
        }
    })
})

router.delete('/delete/:id',(req,res) =>{
    const id = req.params.id;
    var query = "delete from contenu_informatif where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows==0)
            {
                return res.status(404).json({message : "id contenu non existant"});
            }
            else
            {
                return res.status(200).json({message : "Contenu supprimée avec succés"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


router.post('/add',upload.single('photo'),(req,res,next) =>{

    let photo;
    if (!req.file) {
        //return res.status(400).json({ message: 'No file uploaded' });
        photo = undefined;
      }
      else
      {
        photo = req.file.filename;
      }

    let content = req.body;
  query = "insert into contenu_informatif (titre,date,description,photo,etat,id_utilisateur) values(?,?,?,?,?,?)";
  connection.query(query,[content.titre,content.date,content.description,photo,content.etat,content.id_utilisateur],(err,results) =>{
      if(!err){
          return res.status(200).json({message : "Contenu informatif ajouté avec succés"});
      }
     else {
      return res.status(500).json(err);
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  var query = "delete from contenu_informatif where id =?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: "id contenu non existant" });
      } else {
        return res.status(200).json({ message: "Contenu supprimée avec succés" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/add", (req, res, next) => {
  let content = req.body;
  query =
    "insert into contenu_informatif (titre,date,description,photo,etat,id_utilisateur) values(?,?,?,?,?,?)";
  connection.query(
    query,
    [
      content.titre,
      content.date,
      content.description,
      content.photo,
      content.etat,
      content.id_utilisateur,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Contenu informatif ajouté avec succés" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/getByuser/:id_user", (req, res, next) => {
  const id_user = req.params.id_user;
  var query =
    "select id,titre,date,description,photo,etat,id_utilisateur from contenu_informatif where id_utilisateur = ?";
  connection.query(query, [id_user], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/details/:id", (req, res, next) => {
  const id = req.params.id;
  var query =
    "select id,titre, date, description, photo, etat,id_utilisateur from contenu_informatif where id = ?";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
