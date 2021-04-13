const mongoose = require('mongoose');

const HoleSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse'},
    name: String,
    hole_number: Number,
    par: Number,
    tee_a: {
        total_distance: Number,
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
    tee_b: {
        total_distance: Number,
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
    tee_c: {
        total_distance: Number,
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
    tee_d: {
        total_distance: Number,
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
    hole: {
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
    }
});

const Hole = mongoose.model('Hole', HoleSchema);

module.exports = Hole;