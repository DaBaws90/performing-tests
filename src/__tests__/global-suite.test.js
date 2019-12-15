// import Login from '../views/Login'
// import { mount, shallowMount } from '@vue/test-utils'
import requests from '../__mocks__/requests'

import loginTestSuite from '../__test-suites__/login.suite'

// import axios from 'axios'
// jest.mock('axios') // Un-comment this line for axios requests mocking, as the axios import line

/* We could declare here the sotre instantiation instead of doing it in the requests.js file
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfiguration from '../store/storeConfiguration'

const localVue = createLocalVue()
localVue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig) // Move this line inside every test which needs a specific, non-shared store
*/

// const localVue = requests.localVue
// const store = requests.store

// Describe means is a test suite. test means is a test case
describe('Setting up general configuration for every suite', () => {
    beforeAll(async () => {
        jest.setTimeout(20000)
    })
    test('Store has been set properly', () => {
        expect(requests.store).not.toBeUndefined()
        expect(requests.store.state).toBeDefined()
        expect(requests.store.getters).toBeDefined()
    })
    loginTestSuite(requests.localVue, requests.store)
})