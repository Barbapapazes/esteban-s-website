const jwt = require('jsonwebtoken')

exports.validateToken = (req, res, next) => {
    const authorizationCookie = req.session.jwt
    let result
    if (authorizationCookie) {
        const token = req.session.jwt
        const options = {
            expiresIn: '2d',
            issuer: "https://esteban-s-website.herokuapp.com"
        }
        try {
            // verify makes sure thet the token hsn't expired and has been issued by us
            result = jwt.verify(token, 'addjsonwebtokensecretherelikeQuiscustodietipsoscustodes', options)
                // Let's pass back the decoded token to the request object
                // We call next to pass execution to the subsequent middleware
            if (result && result.user === 'admin')
                next();
            else {
                result = {
                    error: `Not Authorized`,
                    status: 401
                }
                res.status(401).send(result)
            }
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            res.send(err)
            throw new Error(err);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        }
        res.status(401).send(result)
    }
}