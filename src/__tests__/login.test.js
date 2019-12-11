import Login from '../views/Login'
import { mount } from '@vue/test-utils'

// Describe means is a test suite. test means is a test case
describe('Login', () => {
    const wrapper = mount(Login)
    test('Login instantiates properly', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
    test('renders properly', () => { 
        expect(wrapper.contains('form')).toBe(true)
    })
})