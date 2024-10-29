

import { Router } from 'express'
import { checkUserEmail } from '../controllers/userController.js'

const router = Router()

router.post('/checkMail',checkUserEmail)

export default router