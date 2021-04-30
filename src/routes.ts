import AnswerController from '@controllers/AnswerController'
import NpsController from '@controllers/NpsController'
import ResearchController from '@controllers/ResearchController'
import SendMailController from '@controllers/SendMailController'
import { Router } from 'express'
import UserController from './controllers/UserController'

const router = Router()

router.post('/users', UserController.create)
router.post('/researches', ResearchController.create)
router.get('/researches', ResearchController.showAll)
router.post('/sendMail', SendMailController.execute)
router.get('/answers/:value', AnswerController.execute)
router.get('/nps/:researchId', NpsController.execute)

export { router }
