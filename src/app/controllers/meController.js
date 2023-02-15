const course = require('../models/course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class meController {
    storedCourses(req, res, next) {



        let courseQuery = course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount: deletedCount,
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);

        // course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {});

        // course
        //     .find({})
        //     .then((courses) =>
        //         res.render("me/stored-courses", {
        //             courses: multipleMongooseToObject(courses),
        //         })
        //     )
        //     .catch(next);
    }

    trashCourses(req, res, next) {
        course
            .findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new meController();
