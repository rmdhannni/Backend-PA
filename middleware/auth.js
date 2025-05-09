const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Akses ditolak. Token tidak ditemukan.');

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Token tidak valid');
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Akses ditolak. Role tidak sesuai.');
        }
        next();
    };
};

// Middleware
function verifyAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
      req.user = user;
      next();
    });
  }
  

module.exports = { authenticate, authorize, verifyAdmin };
