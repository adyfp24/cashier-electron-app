const jwt = require('jsonwebtoken');

const generateJWT = (idUser) => {
    const apiToken = jwt.sign({id : idUser}, process.env.JWT_KEY)
    return apiToken;
}

module.exports = {
    generateJWT
}