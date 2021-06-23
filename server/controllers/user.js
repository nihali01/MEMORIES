import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/user.js";

const secret = 'test';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    //const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });
    const token = jwt.sign( { email: oldUser.email, id: oldUser._id }, 'test', { expiresIn: "1h" } );


    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password,confirmPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });
//we are hasing our password 12 is our salt

    if(password !== confirmPassword)  return res.status(400).json({ message: "Password does not match"});
    const hashedPassword = await bcrypt.hash(password, 12);
//Here returning the the result that's containing our email and hashed password and user name
    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
//here our jwt token containing email id and result_id and this token will expire in 1h means after 1h you have to again login
   // const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
   const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );


    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
