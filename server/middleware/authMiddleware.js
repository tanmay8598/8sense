import jwt from 'jsonwebtoken'
// import User from '../models/userModel'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json('Token is not valid!')
      req.user = user
      // console.log(user)
      // req.user.isAdmin = user.isAdmin
      next()
    })
  } else {
    return res.status(401).json('You are not authenticated!')
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('You are not alowed to do that!')
    }
  })
}

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.isAdmin)
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json('You are not alowed to do that!')
    }
  })
}

export { verifyTokenAndAuthorization, verifyTokenAndAdmin }
