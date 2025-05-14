// register - POST
const register = async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  console.log(
    "First name, Last name, Username, and Password",
    firstName,
    lastName,
    username,
    password
  );

  try {
    const newUser = {
      firstName,
      lastName,
      username,
      password,
    };
    console.log("New user: ", newUser);
    return res.status(201).json({
      success: { message: "Registered successfully. New user created." },
      data: newUser,
      statusCode: 201,
    });
  } catch (error) {
    return res.status(500).json({
      error: { message: "Internal server error!" },
      statusCode: 500,
    });
  }
};

// login - GET
const login = async (req, res, next) => {
  return res.status(200).json({
    success: { message: "User logged in." },
    statusCode: 200,
  });
};

// login/error - GET where we'll send a json message that says "Login error"
const loginError = async (req, res, next) => {
  return res.status(400).json({
    error: { message: "Login error" },
  });
};

// login/local - GET

const localLogin = async (req, res, next) => {
  let result = true;

  function mockPassport(err, user) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  //call the mockPassport feature
  mockPassport();

  res.status(200).json({
    success: { message: "Login successful." },
    result: result
  })
};

// logout - GET
const logout = async (req, res, next) => {
  console.log("Initializing logout controller logic...");
  res.clearCookie("connect.sid");
  res.status(200).json({
    success: { message: "User logging out." },
    statusCode: 200,
  });
  function sessionDestruction(err) {
    //error handling as a final check and a failsafe
    if (err) {
      return next(err);
    }
  }
  sessionDestruction();
  console.log("Logout function activated. Logging out...");
};

// unauthenticated - GET where we'll send a console.log that says "Returning to the homepage..." and redirect the user back home to the index -get



module.exports = { register, login, logout, localLogin };
