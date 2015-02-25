module.exports = function (app) {
    var productmodel = require('../models/product');
    var lineReader = require('line-reader');
    var formidable = require('formidable');

    // product file page
    app.get('/productfile', function (req, res) {
        res.render('file', { title: 'MERCASA', rptasubida: '0' });
    });

    app.post('/productfile', function (req, res, next) {
        console.log("ingresa a product file")
        var incoming = new formidable.IncomingForm();
        console.log("ingresa a product file 2")
        var filename = "";
        incoming.uploadDir = 'uploads';
        console.log("ingresa a product file 3")

        incoming.on('error', function (err) {
            console.log("ingresa a product file 3.5--- ERROR")
            console.log(err);
            res.end();
            //return;
        }).on('fileBegin', function (field, file) {
            console.log("ingresa a product file 4")
            if (file.name) {
                file.path = 'uploads\\' + file.name;
                filename = file.name;
                console.log("ARCHIVO A SUBIR: " + file.path);
            }
            else {
                console.log("No se encuentra archivo: " + file.name)
                return;
            }
        }).on('file', function (field, file) {
            console.log("ingresa a product file 5")
            if (!file.size) { return; }
            console.log(file.name + " recibido")
        }).on('end', function () {
            //---------------------------------------------------------------------
            /*console.log("FILE.NAME: " + filename);
            res.render('file', { title: 'MERCASA', rptasubida: '1' });*/
            console.log("ingresa a product file 6")

            var Productos = [];
            lineReader.eachLine('uploads/' + filename, function (line) {
                var res = line.split(',');
                if (res[12].substring(res[12].length - 1, res[12].length) == "\r") {
                    res[12] = res[12].substring(0, res[12].length - 1)
                }
                var productGen = new productmodel.productModel(res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9], res[10], res[11], res[12]);
                Productos.push(productGen);
            }).then(function () {
                var DATABASE = require('../custom_modules/database');
                var BD = new DATABASE();
                if (Productos != null && Productos != undefined) {
                    if (Productos.length > 0) {
                        BD.insertAllProducts(Productos, function (response) {
                            console.log(response);
                        });
                    }
                }
                res.render('file', { title: 'MERCASA', rptasubida: '1' });
            });
            //---------------------------------------------------------------------

        });
        incoming.parse(req);
    });
}