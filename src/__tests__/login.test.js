import Login from '../views/Login'
import { mount } from '@vue/test-utils'

describe('Login', () => {
    test('Login instantiates properly', () => {
        const wrapper = mount(Login)
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})