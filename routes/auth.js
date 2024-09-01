const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const { users } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
//SIGN UP
router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "please provide a password that is greater than 5 character"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //VALIDATE THE USER
    const { password, email } = req.body;

    //VAlidate  the inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // VALIDATE IF USER DOSENT ALREADY EXIST

    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {  
      return res.status(422).json({
        errors: [
          {
            msg: "This user is alredy exist",
          },
        ],
      });
    }

      //Hash the password

       const hashedPassword = await bcrypt.hash(password, 10);
    
      //Save the password into the db
    users.push({
      email,
      password: hashedPassword,
    });
    //    console.log(hashedPassword)
    //    res.send("Validation Succesfully")

    const token = await JWT.sign(
      {
        email,
      },
      "nfnfjnejnr4ujnhrui4hji9i30949i31ndj",
      {
        expiresIn: 4000000,
      }
    );

    res.json({
      token,
    });
  }
);

router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });

  if (!user) {
    return res.status(422).json({
      errors: [
        {
          msg: "Invalid Credentials",
        },
      ],
    });
  }

  //Check if the password is valid

  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      errors: [
        {
          msg: " Invalid Credential",
        },
      ],
    });
  }
  // Send JSON WEB TOKEN
  const token = await JWT.sign(
    {
      email,
    },
    "nfnfjnejnr4ujnhrui4hji9i30949i31ndj",
    {
      expiresIn: 4000000,
    }
  );

  res.json({
    token
  });
});

//ALL USER

router.get("/all", (req, res) => {
  res.json(users);
});

module.exports = router;
