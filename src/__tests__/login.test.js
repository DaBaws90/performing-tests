import Login from '../views/Login'
import { mount, shallowMount } from '@vue/test-utils'
// import * as requests from '../__mocks__/requests'
import requests from '../__mocks__/requests'

// import axios from 'axios'
// jest.mock('axios') // Un-comment this line for axios requests mocking, as the axios import line

/* We could create a global Vue instance and instantiate an individual, component-specific store instance in every test suite, if needed
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfiguration from '../store/storeConfiguration'

const localVue = createLocalVue()
localVue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig) // Move this line inside every test which needs a specific, non-shared store
*/

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
    describe('Login component - Test suite', () => {
        const wrapper = shallowMount(Login) // shallowMount avoids rendering child components recursively
        // const store = new Vuex.Store(storeConfiguration())
        // const wrapper = mount(Login, { localVue, store }) // Do this if we do not want to have a shared, global store, but a component specific store instance
        test('Login component instantiates properly', () => {
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
        test('Login component renders properly', () => { 
            expect(wrapper.contains('form')).toBe(true)
        })
        test('Login method exists', () => {
            expect(wrapper.vm.login).toBeDefined()
        })
        test('Login service is properly consumed', async() => { // We should handle both success and failure cases in different test to avoid using console.log
            expect.assertions(2)
            try {
                let response = await requests.login()
                expect(response.status).toBe(200)
                expect(response.data).toHaveProperty('access_token')
                try {
                    requests.store.commit('setToken', response.data.access_token)
                    requests.store.commit('setRefreshToken', response.data.refresh_token)
                    // Do this if we do not want to have a shared, global store, but a component specific store instance
                    // wrapper.vm.$store.commit('setToken', response.data.access_token)
                    // wrapper.vm.$store.commit('setRefreshToken', response.data.refresh_token)
                } catch(e) {
                    console.error(e.message)
                }
            } catch(e) {
                console.error('Error with status', e.response.status, e.response.data)
                expect(e.response.status).toBe((400 || 404 || 500))
                expect(e.response.data.error_msg).toBeDefined()
            }
        })
        test('accessToken has been stored properly', () => {
            expect(requests.store.getters.accessToken).not.toBe(null)
        })
        test('refreshToken has been stored properly', () => {
            expect(requests.store.getters.refreshToken).not.toBe(null)
        })
        test('interceptors are setting up headers properly', async () => {
            try {
                let response = await requests.dummyRequest()
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        })
        // Tests axios mocking requests (default implmentation)
        test.skip('testerino', async () => {
            axios.post.mockResolvedValue({data:'some data'});
            const result = await requests.login()
            expect(result).toEqual({data:'some data'})
        })
        test.skip('testerino fails', async () => {
            axios.post.mockRejectedValue({error:'Some error'})
            try {
                await requests.login()
            } catch (error) {
                expect(error.error).toMatch('Some error')
            }
        })
    })
})