import nodeMailer from 'nodemailer'
import Settings from '../config'
import hbs from 'nodemailer-express-handlebars'

const Transport = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: Settings.mail.user,
    pass: Settings.mail.pass
  }
})

Transport.use('compile', hbs({
  viewEngine: {
    extName: '.hbs',
    partialsDir: 'views/email',
    layoutsDir: 'views/email/',
    defaultLayout: '',
  },
  viewPath: 'views/email',
  extName: '.hbs',
}))

export default Transport