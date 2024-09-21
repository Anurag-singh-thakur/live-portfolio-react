const adminAuth = (req, res, next) => {
    const adminSecretKey = req.headers['admin-secret-key'];
  
    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Access denied. Incorrect secret key.' });
    }
  
    next();
  };
  
  module.exports = adminAuth;