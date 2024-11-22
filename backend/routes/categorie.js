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
      let category = req.body;
    //   console.log(photo)
       console.log(category);
    query = "insert into categorie (libelle,photo) values(?,?)";
    connection.query(query,[category.libelle,photo],(err,results) =>{
        if(!err){
            return res.status(200).json({message : "Categorie ajoutée avec succés"});
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})

router.get('/get',(req,res,next)=>{
    var query = "select * from categorie order by libelle";
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


router.get('/getById/:id',(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,libelle,photo from categorie where id = ?";
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
    let photo ;
    if (!req.file) {
        //return res.status(400).json({ message: 'No file uploaded' });
        photo = undefined;
      }
      else
      {
        photo = req.file.filename;
      }

    let category = req.body;
    //console.log(category);
    let id = req.params.id;
    var query = "update categorie set libelle = ?,photo=? where id = ? ";
    connection.query(query,[category.libelle,photo,id],(err,results)=>{
       if(!err)
       {
        if(results.affectedRows == 0 )
        {
            return res.status(404).json({message : "id non existant"});
        }
        else
        {
            return res.status(200).json({message : "Catégorie mise à jour avec succés"});
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
    var query = "delete from categorie where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows==0)
            {
                return res.status(404).json({message : "id categorie non existant"});
            }
            else
            {
                return res.status(200).json({message : "Categorie supprimé avec succés"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;