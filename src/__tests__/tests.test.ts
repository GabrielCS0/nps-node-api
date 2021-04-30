import { usersTest } from './integration/UsersTest'
import { researchesTest } from './integration/ResearchesTest'
import { researchUserTest } from './integration/researchesUsersTest'
import { answerTest } from './integration/AnswersTest'
import { npsTest } from './integration/NpsTest'

describe('Integration Tests', () => {
  usersTest()
  researchesTest()
  researchUserTest()
  answerTest()
  npsTest()
})
