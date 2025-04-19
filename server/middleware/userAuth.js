const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Token not found " });
    }

    try {
        const tokenDecode = jwt.verify(token,"bijay#text");

        if (tokenDecode.id) {  
            req.user = { id: tokenDecode.id }; 
            next(); 
        } else { 
            return res.json({ success: false, message: "id not found . Login Again" }); 
        } 
    } catch (error) { 
        res.json({ success: false, message: error.message }); 
    } 
};

module.exports = userAuth;
