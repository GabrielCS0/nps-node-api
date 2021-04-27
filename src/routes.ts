import ResearchController from '@controllers/ResearchController'
import { Router } from 'express'
import UserController from './controllers/UserController'

const router = Router()

router.post('/users', UserController.create)
router.post('/researches', ResearchController.create)
router.get('/researches', ResearchController.showAll)

export { router }
