import UserModal from '../models/user.model'
import Settings from '../config'
import { sendTemporaryLoginLink } from '../events/sendTemporaryLoginLink'
import { generateRandomString, generteAuthPayload } from '../utils'
import { OAuth2Client } from 'google-auth-library'
import bcrypt from 'bcryptjs'

export const register = (req, res) => {
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  const User = new UserModal({
    email: req.body.email,
    password
  })

  User.save(err => {
    if (err)
      return res.jsonError(err)

    res.jsonResponse('User Registered Successfully')
  })
}

export const login = (req, res) => {
  const credentials = req.body.token ? { token: req.body.token } : { email: req.body.email }

  UserModal.findOne(credentials, (err, user) => {
    if (err)
      return res.jsonError(err)

    if (!user)
      return res.jsonResponse('User Not Found', {}, 404)

    /** Reset Token */
    if (req.body.token) {
      UserModal.findByIdAndUpdate(user._id, {
        token: null
      }, (err, response) => { })
    } else {
      /** Verify Password */
      const isValid = bcrypt.compareSync(req.body.password, user.password)
      if (!isValid)
        return res.jsonResponse('Invalid Password', {}, 400)
    }

    const data = generteAuthPayload(user)
    res.jsonResponse('Logged In Successfully', data)
  })
}

export const sendLoginLink = (req, res) => {
  const email = req.body.email
  const token = generateRandomString(100);

  UserModal.findOneAndUpdate(
    { email },
    { token },
    { upsert: true, new: true, runValidators: true },
    (err, doc) => {
      if (err)
        return res.jsonError(err)

      sendTemporaryLoginLink(email, { token }, (err) => {
        if (err) {
          return res.jsonError(err)
        }

        res.jsonResponse('Email Sent Successfully')
      })
    }
  );
}

export const loginWithGoogle = (req, res) => {
  const client = new OAuth2Client(Settings.google.client_id, '', '')
  client.verifyIdToken({
    idToken: req.body.token,
    audience: Settings.google.client_id
  }).then(response => {
    const payLoad = response.getPayload()
    const email = payLoad.email

    UserModal.findOneAndUpdate(
      { email },
      {},
      { upsert: true, new: true, runValidators: true },
      (err, user) => {
        if (err)
          return res.jsonError(err)

        const data = generteAuthPayload(user)
        res.jsonResponse('Logged In Successfully', data)
      }
    )
  }).catch(() => {
    res.jsonResponse('Something Went Wrong')
  })
}

export const logout = (req, res) => {
  res.jsonResponse('Logged out Successfully')
}