const { default: axios } = require("axios");

const predictController = async (req, res) => {
    try {
        const response = await axios.get("http://host.docker.internal:8000");
        console.log(response.data);
        res.status(200).json({
            status: true,
            message: "predict is here"
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