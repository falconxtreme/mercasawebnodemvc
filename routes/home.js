module.exports = function (app) {

    // home page
    app.get('/', function (req, res) {
        res.render('index', { title: 'MERCASA.  ' })
    });

    // chat area
    app.get('/chat', function (req, res) {
        res.render('chat', { title: 'Chat with Us!  ' })
    });

    // about page
    app.get('/about', function (req, res) {
        res.render('about', { title: 'About Us.  ' })
    });
}
