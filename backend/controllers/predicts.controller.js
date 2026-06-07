const { default: axios } = require("axios");
const Histories = require("../models/Histories.model");

const predictController = async (req, res) => {
    try {
        const data = req.body;
        const host = process.env.AI_HOST
        const response = await axios.post(`${host}/predict`, data);

        await Histories.create({
            userId: req.users.id,
            data: data,
            predict: response.data
        })

        res.status(200).json({
            status: true,
            data: response.data
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
    predictController
}