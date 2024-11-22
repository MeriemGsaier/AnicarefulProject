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


router.post('/add',upload.single('photo'),(req,res,next)=>{

    let photo;
    if (!req.file) {
        //return res.status(400).json({ message: 'No file uploaded' });
        photo = undefined;
      }
      else
      {
        photo = req.file.filename;
      }
    let product = req.body;
    console.log(product);
    var query = "insert into produit (libelle,prix,description,photo,id_categorie) values(?,?,?,?,?)";
    connection.query(query,[product.libelle,product.prix,product.description,photo,product.id_categorie],(err,results)=>{
        if(!err)
        {
            return res.status(200).json({message : "Produit ajouté avec succés"});
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})

router.get('/get',(req,res,next)=>{
    var query = "select p.id,p.libelle,p.prix,p.description,p.photo,p.id_categorie,c.libelle as nomcategorie from produit p,categorie c where p.id_categorie=c.id";
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


router.get('/getByCategory/:id',(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,libelle,prix,description,photo from produit where id_categorie = ? ";
    connection.query(query,[id],(err,results)=>{
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
    var query = "select id,libelle,prix,description,photo from produit where id = ?";
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

router.patch('/update/:id',upload.single('photo'),(req,res,next) =>{
    let photo;
    if (!req.file) {
        //return res.status(400).json({ message: 'No file uploaded' });
        photo = undefined;
      }
      else
      {
        photo = req.file.filename;
      }

    let product = req.body;
    let id = req.params.id;
    var query = "update produit set libelle = ?,prix=?,description=?,photo=?,id_categorie=? where id = ? ";
    connection.query(query,[product.libelle,product.prix,product.description,photo,product.id_categorie,id],(err,results)=>{
       if(!err)
       {
        if(results.affectedRows == 0 )
        {
            return res.status(404).json({message : "id produit non existant"});
        }
        else
        {
            return res.status(200).json({message : "produit mis a jout avec succes"});
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
    var query = "delete from produit where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows==0)
            {
                return res.status(404).json({message : "id produit non existant"});
            }
            else
            {
                return res.status(200).json({message : "produit supprimé avec succes"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;