import React from 'react'
import { mount } from 'enzyme'
import { matchers } from '@emotion/jest'
import { HorizontalScroll } from '../horizontal-scroll'

expect.extend(matchers)

describe('HorizontalScroll tests', () => {
    test('HorizontalScroll renders correctly', () => {
        const wrapper = mount(<HorizontalScroll>This is HorizontalScroll.</HorizontalScroll>)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper).toHaveStyleRule('display', 'flex')
    })
})
