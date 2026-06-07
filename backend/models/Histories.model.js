const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: Number,
    data: Object,
    predict: Object
}, {
    timestamps: true,
})

const Histories = mongoose.model('Histories', schema);

module.exports = Histories;
