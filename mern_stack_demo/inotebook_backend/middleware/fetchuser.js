const jwt = require('jsonwebtoken');
const JWT_SECRET = '$hhhhhh';

const fetchUsers = (req, res, next) => {
    // get a user from jwt token and add user id in request object
    const authToken = req.header('auth-token');
    if (!authToken) {
        res.status(401).send('Please validate using a valid token!!');
    }

    try {
        // extracting user object from token, that was added while creating a token
        const tokenData = jwt.verify(authToken, JWT_SECRET);
        console.log('tokendata------', tokenData);
        
        // adding user object to req
        req.user = tokenData.user;
    } catch (error) {
        res.status(500).send('Please validate using a valid token!!');
    }
    next();
}

module.exports = fetchUsers;