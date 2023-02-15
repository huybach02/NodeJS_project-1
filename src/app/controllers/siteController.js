const course = require('../models/course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class siteController {
    index(req, res, next) {
        //Viet bang callback

        // course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     } else {
        //         next(err);
        //     }
        // });

        //viet bang promise
        course
            .find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new siteController();
