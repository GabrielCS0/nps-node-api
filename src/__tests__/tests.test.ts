import { usersTest } from './integration/UsersTest'
import { researchesTest } from './integration/ResearchesTest'
import { researchUserTest } from './integration/researchesUsersTest'

describe('Integration Tests', () => {
  usersTest()
  researchesTest()
  researchUserTest()
})
