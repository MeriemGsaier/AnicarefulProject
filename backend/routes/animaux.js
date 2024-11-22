const express = require ('express');
const connection = require('../connection');
const router = express.Router();

//à faire verification de l'authentification
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
      let animal = req.body;
    query = "insert into animal (nom,espece,race,age,sexe,poids,photo,information_medicale,regime_alimentaire,id_proprietaire) values(?,?,?,?,?,?,?,?,?,?)";
    connection.query(query,[animal.nom,animal.espece,animal.race,animal.age,animal.sexe,animal.poids,photo,animal.info_med,animal.reg_alim,animal.id_prop],(err,results) =>{
        if(!err){
            return res.status(200).json({message : "Animal ajoutée avec succés"});
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


router.get('/get/:id_prop',(req,res,next)=>{
    const id_prop = req.params.id_prop;
    var query = "select * from animal where id_proprietaire = ?";
    connection.query(query,[id_prop],(err,results)=>{
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




router.get('/getById/:id',(req,res,next)=>{
    const id = req.params.id;
    var query = "select nom,espece,race,age,sexe,poids,information_medicale,regime_alimentaire,id_proprietaire from animal where id = ?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            return res.status(200).json(results[0]);
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update/:id',(req,res,next) =>{
    let animal = req.body;
    let id = req.params.id;
    var query = "update animal set nom = ?,espece=?,race=?,age=?,sexe=?,poids=?,information_medicale=?,regime_alimentaire=? where id = ? ";
    connection.query(query,[animal.nom,animal.espece,animal.race,animal.age,animal.sexe,animal.poids,animal.info_med,animal.reg_alim,id],(err,results)=>{
       if(!err)
       {
        if(results.affectedRows == 0 )
        {
            return res.status(404).json({message : "id non existant"});
        }
        else
        {
            return res.status(200).json({message : "Animal mis à jour avec succés"});
        }
       }
       else
       {
        return res.status(500).json(err);
       } 
    })
})


router.delete('/delete/:id',(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from animal where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows==0)
            {
                return res.status(404).json({message : "id animal non existant"});
            }
            else
            {
                return res.status(200).json({message : "Animal supprimé avec succés"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;