class newsController {
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.send('New 1');
    }
}

module.exports = new newsController();
