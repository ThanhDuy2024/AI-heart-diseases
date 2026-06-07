const Histories = require("../models/Histories.model");
const historyController = async (req, res) => {
    try {
        const histories = await Histories.find({
            userId: req.users.id
        }).sort({ createdAt: -1});

        res.status(200).json({
            status: true,
            data: histories
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: false,
            message: "Bad request"
        })
    }
}

module.exports = {
    historyController
};