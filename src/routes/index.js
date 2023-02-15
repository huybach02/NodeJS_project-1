const newsRouter = require('./news');
const meRouter = require('./me');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
    // method
    app.use('/news', newsRouter);
    app.use('/me', meRouter);
    app.use('/khoa-hoc', coursesRouter);
    app.use('/', siteRouter);
}

module.exports = route;
