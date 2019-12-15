import Login from '../views/Login'
import { mount, shallowMount } from '@vue/test-utils'
import requests from '../__mocks__/requests'

export default (localVue, store) => {
    describe('Login component - Test suite', () => {
        // const store = new Vuex.Store(storeConfiguration()) // Do this if we do not want to have a shared, global store, but a component specific store instance
        // We need to inject the Vue and store instances to make use of v-if directive who relies on certain store states. Eg: if user is logged in. If not, a render exception would be throw
        const wrapper = shallowMount(Login, { localVue, store }) // shallowMount avoids rendering child components recursively
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
                    // store.commit('setToken', response.data.access_token)
                    // store.commit('setRefreshToken', response.data.refresh_token)
                    // requests.store.commit('setToken', response.data.access_token)
                    // requests.store.commit('setRefreshToken', response.data.refresh_token)
                    wrapper.vm.$store.commit('setToken', response.data.access_token)
                    wrapper.vm.$store.commit('setRefreshToken', response.data.refresh_token)
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
            expect(store.getters.accessToken).not.toBe(null)
        })
        test('refreshToken has been stored properly', () => {
            expect(store.getters.refreshToken).not.toBe(null)
        })
        test.skip('interceptors are setting up headers properly', async () => {
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
}