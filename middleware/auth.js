const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get Token from the header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No Token, authorization denied' });
    }

    // Verify Token => authorization
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}