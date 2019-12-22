import express from 'express'
import AuthRoutes from './auth.route'
import XMLParserRoutes from './xmlParser.route'

const router = express.Router()
router.use('/auth', AuthRoutes)
router.use('/xml-parser', XMLParserRoutes)

export default router