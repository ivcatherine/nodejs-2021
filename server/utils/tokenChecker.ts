const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    
    if(token){
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                next({ status: 403, messages: 'Failed to authenticate token'});
            } else {
                next();
            }
        });
    } else {
        next({ status: 401, messages: 'No token provided'});
    }
}

module.exports = checkToken;