module.exports = function(app) {
    var DATABASE = require('../custom_modules/database');
    var BD = new DATABASE();

    var productosBD;

    // catalog page
    app.get('/catalog', function(req, res) {
        BD.getAllProducts(function(productosBD){
           res.render('index_product', { 
            title: 'MERCASA', 
            productos: productosBD});
        });
    });

    // create product page
    app.get('/catalogcreate', function(req, res) {
        res.render('create', { title: 'MERCASA'});
        //res.redirect('/');
    });
    app.post('/catalogcreate', function(req, res) {
        BD.insertProduct([req.body.codigointerno, req.body.codigobarra, req.body.tipo,
            req.body.nombre, req.body.marca, req.body.presentacion, req.body.preciopormenor, req.body.preciopormayor,
            req.body.precioplazavea, req.body.preciowong, req.body.preciomercasa, req.body.margenmercasa], function (response) {
                console.log(response);
                BD.getAllProducts(function (productosBD) {
                    //console.log(productosBD);
                    res.render('index_product', { title: 'MERCASA', productos: productosBD});
                });
        });
    });
}