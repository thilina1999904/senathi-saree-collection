import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

// Register User

dotenv.config();

export function RegisterUser(req, res) {

    const data = req.body;

    data.password = bcrypt.hashSync(data.password,10);

    const newUser = new User(data);

   
    newUser.save().then(() => {
        res.json("New User Register Successfully")
    }).catch((err) => {
        res.status(500).json({ error: "User Registration Failed" })
    })
}

//Login User 

export function LoginUser (req,res){

    const data = req.body;

  User.findOne({ email: data.email })
    .then((user) => {
 
      if (user == null) {
        return res.status(404).json({ error: "User Not Found" });
      }

     
      const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

      if (isPasswordCorrect) {

        const token = jwt.sign({
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            role : user.role,
            profilePicture: user.profilePicture

        },process.env.JWT_SECRET,{ expiresIn: "1d" });
       
        res.json({
          message: "Login Successful",
            token: token,       
        });
      } else {
        return res.status(401).json({ error: "Login Failed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
}


export function isItAdmin(req){
        let isAdmin = false;

    if (req.user != null) {
        if (req.user.role == "admin") {
            isAdmin = true;
        }
    }
    return isAdmin;
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKYW5lYWRtaW4iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoiamFuZWFkbWluLmRvZUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3MDcyODY2N30.sMCRdipaYVU1ia3AuLKlxpoPLwAIxfRwi3B2bJ6La7Q//