const express = require ('express');
const connection = require('../connection');
const router = express.Router();

//à faire verification de l'authentification
var auth = require ('../services/authentification');


router.get('/getNonArchives',(req,res,next)=>{
    var query = "select c.id,u.nom,u.prenom,c.date,c.montant,c.adresse_livraison from commande c,utilisateur u,proprietaire p where c.id_proprietaire=p.id and p.id = u.id and c.etat_archive='false'";
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


router.get('/getArchives',(req,res,next)=>{
    var query = "select c.id,u.nom,u.prenom,c.date,c.montant,c.adresse_livraison from commande c,utilisateur u,proprietaire p where c.id_proprietaire=p.id and p.id = u.id and c.etat_archive='true'";
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


router.patch('/archiver/:id',(req,res) =>{
    const id = req.params.id;
    var query = "update commande set etat_archive = 'true' where id = ?";
    connection.query(query,[id],(err,results)=> {
        if(!err){
            if(results.affectedRows == 0)
            {
                return  res.status(404).json({message:"Id commande non existant !"}); 
            }
            return  res.status(200).json({message:"Commande archivée avec succés avec succés !"}); 
        }
        else
        {
            return res.status(500).json(err); 
        }
    })
})

router.patch('/restaurer/:id',(req,res) =>{
    const id = req.params.id;
    var query = "update commande set etat_archive = 'false' where id = ?";
    connection.query(query,[id],(err,results)=> {
        if(!err){
            if(results.affectedRows == 0)
            {
                return  res.status(404).json({message:"Id commande non existant !"}); 
            }
            return  res.status(200).json({message:"Commande restaurée avec succés !"}); 
        }
        else
        {
            return res.status(500).json(err); 
        }
    })
})

router.delete('/delete/:id',(req,res) =>{
    const id = req.params.id;
    var query = "delete from commande where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err)
        {
            if(results.affectedRows==0)
            {
                return res.status(404).json({message : "id commande non existant"});
            }
            else
            {
                return res.status(200).json({message : "Commande supprimée avec succés"});
            }
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


router.post('/add',(req,res,next)=>{
    let commande = req.body;
    console.log(commande);
    var query = "insert into commande (id_proprietaire,date,adresse_livraison,montant,etat_archive) values(?,?,?,?,?)";
    connection.query(query,[commande.id_proprietaire,commande.date,commande.adresse_livraison,commande.montant,commande.etat_archive],(err,results)=>{
        if(!err)
        {
            return res.status(200).json({message : "Commande passée avec succés"});
        }
        else
        {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;