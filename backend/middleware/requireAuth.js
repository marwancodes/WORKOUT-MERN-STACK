import jwt from "jsonwebtoken";
import { User } from '../models/userModel.js'

const requireAuth = async (req, res, next) => {

    // verfiy authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];
    
    try {

        
        const { _id } = jwt.verify(token, process.env.SECRET); // verify if the token = SECRET

        req.user = await User.findOne({ _id }).select('_id'); // that user it's just a name, can be anything

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Request is not authorized' });
    }

}

export default requireAuth;