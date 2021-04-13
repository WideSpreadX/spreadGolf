const mongoose = require('mongoose');

const GolfBagSchema = new mongoose.Schema({
    manufacturure: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Club'}],
    // Actual Club Name in English (or whatever language)
    name: String,
    // URL to club page
    url: String,
    rating: Number
});

const GolfBag = mongoose.model('GolfBag', GolfBagSchema);

module.exports = GolfBag;