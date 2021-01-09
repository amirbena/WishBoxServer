const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../../database')
const handleCatch = require('../others/handleCatch');

const createToken = async user => {
    const { _id: id, numGuests, fullName, isAdmin } = user;
    const payload = {
        id,
        fullName,
        numGuests,
        isAdmin
    }
    const token = await jwt.sign(payload, process.env.TOKEN_KEY);
    return token;
}

const signup = async (req, res) => {
    try {
        const user = await UserRepository.createUser(req.body);
        if (user === "User with same email exist") return res.status(StatusCodes.CONFLICT).send(user);
        const token = await createToken(user);
        res.setHeader("Authorization", token);
        const message = "User signed up successfully"
        return res.status(StatusCodes.CREATED).json({ user, message });
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.login(email, password);
        if (user === "Email not found") return res.status(StatusCodes.NOT_FOUND).send(user);
        if (user === "passwords not match") return res.status(StatusCodes.CONFLICT).send(user);
        const token = await createToken(user);
        res.setHeader("Authorization", token);
        const message = "User signed in successfully"
        return res.status(StatusCodes.OK).json({ user, message });
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const getAllUsersExceptCurrent = async (req, res) => {
    try {
        const { id } = req.user;
        const users = await UserRepository.getAllUsersExceptId(id);
        res.json({ users });
    } catch (error) {
        handleCatch(res, error)
    }

}

const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId } = req.body;
        const result = UserRepository.changeUserStatus(id, userId);
        if (result === "Admin not Exist" || result === "User not exist") return res.status(StatusCodes.NOT_FOUND).send(result);
        return res.send(result);
    } catch (error) {
        handleCatch(res, error)
    }

}

module.exports = {
    signup,
    signin,
    getAllUsersExceptCurrent,
    updateUserDetails
}


