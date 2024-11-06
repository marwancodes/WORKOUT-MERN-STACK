import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: '3d'});
}

//TODO: login user
export const loginUSer = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);
        
        res.status(200).send({ email, token });

    } catch (error) {
    res.status(400).send({ message: error.message });

    }
}

//TODO: signup user
export const signupUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password); //! that for authentication from Model (validation & crypt hash the password)

        // create a token
        const token = createToken(user._id);

        res.status(200).send({ email, token });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
} 
