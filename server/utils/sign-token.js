const jwt = require('jsonwebtoken');

const generateJWT = (idUser) => {
    const secret = process.env.JWT_SECRET || process.env.JWT_KEY || "autocenterpart2025";
    const apiToken = jwt.sign({id : idUser}, secret);
    return apiToken;
}

module.exports = {
    generateJWT
}