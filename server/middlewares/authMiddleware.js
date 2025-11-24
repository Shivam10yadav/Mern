import jwt from 'jsonwebtoken';  // ✅ Add this line at the top


const protect = async (req, res, next) => {


  console.log("HEADERS RECEIVED:", req.headers);

  let token = req.headers.authorization;

  if (!token) {
    console.log("❌ No authorization header received");
    return res.status(401).json({ message: 'unauthorized' });
  }

  // Extract actual token
    token = token.split(" ")[1];

  console.log("EXTRACTED TOKEN:", token);

  if (!token) {
    console.log("❌ Token missing after split");
    return res.status(401).json({ message: 'unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    console.log("✅ Token decoded:", decoded);
    next();
  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);
    return res.status(401).json({ message: 'unauthorized' });
  }
};

export default protect;
