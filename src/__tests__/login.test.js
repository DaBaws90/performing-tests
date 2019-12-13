import Login from '../views/Login'
import { mount } from '@vue/test-utils'
// import * as requests from '../__mocks__/requests'
import requests from '../__mocks__/requests'

import axios from 'axios'
// jest.mock('axios')
import interceptorsSetup from '../interceptor/interceptor'

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfiguration from '../store/storeConfiguration'

const localVue = createLocalVue()
localVue.use(Vuex)
const storeConfig = storeConfiguration()
const store = new Vuex.Store(storeConfig)

// Describe means is a test suite. test means is a test case
describe('Setting up general configuration for every suite', () => {
    beforeAll(async () => {
        jest.setTimeout(20000)
    })
    test('store has been set', () => {
        expect(requests.store).not.toBeUndefined()
        expect(requests.store.state).toBeDefined()
        expect(requests.store.getters).toBeDefined()
        // expect(requests.store.actions).toBeDefined()
        // expect(requests.store.mutations).toBeDefined()
        // console.log(requests.store.state.session.accessToken)
    })
    describe('Login component - Test suite', () => {
        const wrapper = mount(Login, {
            store,
            localVue
        }) // shallowMount avoids rendering child components recursively
        test.skip('Login instantiates properly', () => {
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
        test.skip('renders properly', () => { 
            expect(wrapper.contains('form')).toBe(true)
        })
        test.skip('submit axios method exists', () => {
            expect(wrapper.vm.submit).toBeDefined()
        })
        test('consumes login service', async() => { // We should handle both success and failure cases in different test to avoid using console.log
            expect.assertions(2)
            try {
                let response = await requests.login()
                expect(response.status).toBe(200)
                expect(response.data).toHaveProperty('access_token')
                try {
                    wrapper.vm.$store.commit('setToken', response.data.access_token)
                    wrapper.vm.$store.commit('setRefreshToken', response.data.refresh_token)
                    console.log(wrapper.vm.$store.getters.accessToken)
                } catch(e) {
                    console.error(e.message)
                }
            } catch(e) {
                console.error('Error with status', e.response.status, e.response.data)
                expect(e.response.status).toBe((400 || 404 || 500))
                expect(e.response.data.error_msg).toBeDefined()
            }
        })
        test.skip('accessToken has been stored properly', () => {
            expect(requests.store.getters.accessToken).not.toBe(null)
        })
        test.skip('login service fails', async () => {
            // expect.assertions(1)
            try {
                await requests.login()
            } catch (e) {
                console.error(e.response.error_msg)
            }
        })
        test.skip('fake API data fetch', async() => {
            try {
                const data = await requests.getUsers()
                expect(data.data).toEqual({
                    userId: 1,
                    id: 1,
                    title: 'delectus aut autem',
                    completed: false
                })
            } catch (e) {
                expect(e).not.toBe(null)
            }
        })
        // Tests axios mocking requests
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