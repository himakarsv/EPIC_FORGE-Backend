const jwt = require("jsonwebtoken");

// const authenticateSeller = (req, res, next) => {
//     const authHeader = req.headers['authorization'] || req.headers['Authorization'];
//     console.log(authHeader);
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log(token);
//   if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     // if (err) return res.status(403).json({ error: 'Invalid token.' });

//     if (err) {
//         console.log(err); // Log the error to inspect it
//         return res.status(403).json({ error: 'Invalid token.' });
//       }
    

//     // Check if user is a seller
//     if (user.role !== 'seller') {
//       return res.status(403).json({ error: 'Access denied. Only sellers are allowed.' });
//     }

//     req.user = user; // Add user to request object
//     next();
//   });
// };

// const key="axb$cy";
const authenticateSeller = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
    
    try {
      // Synchronous token verification
      const user = jwt.verify(token, process.env.JWT_SECRET); 
  
      // Check if the user is a seller
      if (user.role !== 'seller') {
        return res.status(403).json({ error: 'Access denied. Only sellers are allowed.' });
      }
  
      // Pass user information to the next middleware
      req.user = user;
      next();
    } catch (err) {
      console.log('JWT Verification Error:', err); // Log the error for debugging
      return res.status(403).json({ error: 'Invalid token.' });
    }
  };
  
  


const authenticateBuyer = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Invalid token.' });
  
      // Check if user is a buyer
      if (user.role !== 'buyer') {
        return res.status(403).json({ error: 'Access denied. Only buyers are allowed.' });
      }
  
      req.user = user; // Add user to request object
      next();
    });
  };

module.exports ={ authenticateSeller,authenticateBuyer};
