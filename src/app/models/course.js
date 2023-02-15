const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const course = new Schema(
    {
        _id: {type: Number},
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            maxLength: 600,
        },
        image: {
            type: String,
            maxLength: 255,
        },
        slug: { type: String },
        videoId: {
            type: String,
            require: true,
        },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {   timestamps: true,
        _id: false,
    },
);

course.plugin(AutoIncrement);

course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('course', course);
