import userService from "#@/services/user.services.js"

const register = async(req, res, next) =>{
    try{
        const user = await userService.register(req.body);
        res.status(201).json(user);
    }catch(error){
        next(error);
    }
};
const login = async(req, res, next) => {
    try{
        const token = await userService.login(req.body);
        res.json({token})
    }catch(error){
        next(error);
    }
}
export default {register, login};
