const mongoose = require('mongoose');

const GolfCourseSchema = new mongoose.Schema({
    name: String,
    url: String,
    rating: Number,
    address: {
        street_1: String,
        street_2: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        location: {
            type: {
              type: String,
              enum: ['Point'],
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          }
    },
    holes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hole'}]
});

const GolfCourse = mongoose.model('GolfCourse', GolfCourseSchema);

module.exports = GolfCourse;