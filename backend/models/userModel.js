import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//TODO: static signup method
userSchema.statics.signup = async function(email, password) {

    //* validation (validator library)
    if (!email || !password) {
        throw Error("All fields must be filled!");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid!");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough!");
    }


    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt); // here you hash the password  using bcrypt

    const user = await this.create({ email, password: hashPassword});

    return user;
}

//TODO: static login method
userSchema.statics.login = async function(email, password) {

    //* validation
    if (!email || !password) {
        throw Error("All fields must be filled!");
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
}


export const User = mongoose.model('User', userSchema);
