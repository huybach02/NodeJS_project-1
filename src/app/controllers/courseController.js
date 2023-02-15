const course = require('../models/course');
const { mongooseToObject } = require('../../util/mongoose');

class courseController {
    //courses/:slug
    show(req, res, next) {
        course
            .findOne({
                slug: req.params.slug,
            })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    create(req, res, next) {
        res.render('courses/create');
    }

    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;        
        const Course = new course(formData);
        Course.save()
            .then(() => res.redirect('/me/stored/khoa-hoc'))
            .catch(next);
    }

    edit(req, res, next) {
        course
            .findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // update(req, res, next) {
    //     course
    //         .updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect("/me/stored/khoa-hoc"))
    //         .catch(next);
    // }
    update(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        //update course after adding image, slug
        course
            .updateOne({ _id: req.params.id }, formData)
            .then(() => res.redirect('/me/stored/khoa-hoc'))
            .catch(next);
    }

    delete(req, res, next) {
        course
            .delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    forceDelete(req, res, next) {
        course
            .deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    restore(req, res, next) {
        course
            .restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                course
                    .delete({ _id: { $in: req.body.courseIds } }) //Xoa tat ca nhung gi co trong mang courseIds
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is fail' });
        }
    }
}

module.exports = new courseController();
