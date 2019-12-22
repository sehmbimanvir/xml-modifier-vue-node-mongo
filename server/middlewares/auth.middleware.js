import jwt from 'jsonwebtoken'
import Settings from '../config';

export const validateToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.jsonResponse('No Token Provided', null, 401);
  }

  jwt.verify(token, Settings.jwt.secret, (err, decoded) => {
    if (err) {
      return res.jsonError(err)
    }
    next()
  })
}