import User from '#@/models/user.model.js'
import bcrypt from "bcrypt";
import generateToken from '#@/utils/jwt.js';

const register = async({email, password}) => {
    const existing = await User.findOne({
        email
    });
    if(existing){
        throw new Error("Email already in use");
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashed
    });
    return {
        id: user._id,
        email: user.email
    };
};

const login = async({email, password}) => {
    const user = await User.findOne({
        email
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return generateToken(user._id);
}

export default {register, login};