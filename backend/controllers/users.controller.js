const registerController = async (req, res) => {
  try {
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
    res.status(200).json({
      status: true,
      message: "Login successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Bad request"
    })
  }
}

const profileController = async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      message: "profile is here!"
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