const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
    manufacturure: { type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    // Iron, Wood, Driver, Hybrid, Putter etc.
    type: String,
    // Iron/Wood #
    number: Number,
    // Actual Club Name in English (or whatever language)
    name: String,
    // URL to club page
    url: String,
    rating: Number
});

const Club = mongoose.model('Club', ClubSchema);

module.exports = Club;