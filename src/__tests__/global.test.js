import requests from '../__mocks__/requests'

import loginTestSuite from '../__test-suites__/login.suite'

// import axios from 'axios'
// jest.mock('axios') // Un-comment these lines for axios requests mocking

/* We could declare here the store instance instead of doing it in the requests.js file
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfiguration from '../store/storeConfiguration'

const localVue = createLocalVue()
localVue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig) // Move this line inside every test which needs a specific, non-shared store
*/

// Describe means is a test suite. test means is a test case
describe('General Suite -> Setting up general configuration for every suite', () => {
    beforeAll(async () => {
        jest.setTimeout(20000)
    })
    test('Store has been set properly', () => {
        expect(requests.store).not.toBeUndefined()
        expect(requests.store.state).toBeDefined()
        expect(requests.store.getters).toBeDefined()
    })
    // Components test suites declaration --------------------------------------------------
    // Login Test Suite
    loginTestSuite(requests.localVue, requests.store) // We send as args the Vue and store instances we are going to share across components
    // More Test Suites for components declared below...

    // End of components test suites declaration -------------------------------------------
    test('Store mantains its state across multiple tests', () => {
        expect(requests.store.getters.accessToken).not.toBe(null)
    })
})