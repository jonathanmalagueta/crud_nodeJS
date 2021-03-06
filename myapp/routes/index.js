var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const db = mysql.createPool({
  host : 'localhost',
  user : 'root',
  password: '',
  database: 'db_nodejs_crud',
  debug : false

});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testaconexao', function(req,res,next){
  if(db != null){
    res.send("conexao feita com sucesso!!")
  }
      res.send("Falha na conexão!");

});


router.get('/select', function(req,res, next){
   db.query('SELECT * FROM tb_book', function(err,rs){
        res.render('select', { books: rs});
   })
});

router.get('/form', function(req,res,next){
   res.render('form', { book: {}});
})


router.post('/form', function(req,res,next){
  db.query('INSERT INTO tb_book SET ?', req.body, function(err,rs){
         res.redirect('select')
  });
});

router.get('/delete', function(req,res,next){
  db.query('DELETE FROM tb_book where id = ?', req.query.id, function(err,rs){
       res.redirect('select')
  });
});


router.get('/edit', function(req,res,next){
      db.query('SELECT * FROM tb_book WHERE id=?', req.query.id, function(err,rs){
        res.render('form', { book: rs[0]})
      })
});
router.post('/edit', function(req,res,next){
  var param = [ 
      req.body,
      req.query.id
  ]
  db.query('UPDATE tb_book SET ? WHERE id=?', param , function(err,rs){
     res.redirect('/select');
  })
})
module.exports = router;
