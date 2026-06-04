const Users = require("../models/Users.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const account = await Users.findOne({
      where: {
        email: email,
      }
    });

    if (account) {
      return res.status(400).json({
        status: false,
        message: "Email existed!"
      })
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password);
    await Users.create({
      fullName: fullName,
      email: email,
      password: hash
    });

    res.status(200).json({
      status: true,
      message: "Register successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Bad request"
    })
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const account = await Users.findOne({
      where: {
        email: email,
      }
    });

    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found"
      })
    }

    const compare = bcrypt.compareSync(password, account.dataValues.password);

    if (!compare) {
      return res.status(404).json({
        status: false,
        message: "Account not found"
      })
    }

    const token = jwt.sign({
      id: account.dataValues.id,
      fullName: account.dataValues.fullName,
    }, process.env.JWT_PASSWORD)

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
      // partitioned: true
    });

    res.status(200).json({
      status: true,
      message: "Login successfully!",
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: false,
      message: "Account not found!"
    })
  }
}

const profileController = async (req, res) => {
  try {
    const profile = await Users.findOne({
      where: {
        id: req.users.id
      },
      attributes: ["id", "fullName", "email", "createdAt", "updatedAt"]
    });

    res.status(200).json({
      status: true,
      data: profile.dataValues
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
  registerController,
  loginController,
  profileController
}