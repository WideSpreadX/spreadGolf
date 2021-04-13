const mongoose = require('mongoose');

const ScorecardSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'GolfCourse'},
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    holes: [
        {
            hole_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Hole'},
            strokes: Number,
            mulligans: Number,
            penalties: Number,
            clubs_used: [
                { type: mongoose.Schema.Types.ObjectId, ref: 'Club'}
            ]
        }
    ],
    date_played: {
        type: Date,
        default: Date.now()
    }
});

const Scorecard = mongoose.model('Scorecard', ScorecardSchema);

module.exports = Scorecard;