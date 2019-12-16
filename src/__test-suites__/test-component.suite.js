import TestComponent from '../views/TestComponent'
import { mount, shallowMount } from '@vue/test-utils'
import requests from '../__mocks__/requests'

export default (localVue, store) => {
    describe('TestComponent - Test Suite', () => {
        const wrapper = shallowMount(TestComponent, { localVue, store })

        test('TestComponent instantiates properly', () => {
            expect(wrapper.isVueInstance()).toBeTruthy()
        })
        test('TestComponent renders properly', () => { 
            expect(wrapper.contains('button')).toBe(true)
        })
        test('TestComponent conditionally renders if user is super admin', () => {
            expect(wrapper.contains('p')).toBeTruthy()
        })
    })
}