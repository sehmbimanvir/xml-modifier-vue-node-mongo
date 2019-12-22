import express from 'express'
import {
  loadDataFromUrl
} from '../controllers/xmlParser.controller'
import { validateToken } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/load-file', validateToken, loadDataFromUrl)

export default router