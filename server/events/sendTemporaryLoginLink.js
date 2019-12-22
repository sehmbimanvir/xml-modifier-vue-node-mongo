import Mailer from '../services/mailer.service'
import Settings from '../config'

export const sendTemporaryLoginLink = (email, data, callback) => {
  let message = {
    from: Settings.mail.from,
    to: email,
    subject: 'Temporary Login Link',
    template: 'temporaryLoginLink',
    context: {
      data,
      site: Settings.site
    }
  }

  return Mailer.sendMail(message, (err, response) => {
    callback(err, response)
  })
}