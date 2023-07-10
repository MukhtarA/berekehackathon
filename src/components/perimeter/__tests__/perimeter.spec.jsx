import React from 'react'
import { shallow, mount } from 'enzyme'

import { Perimeter } from '../perimeter'

describe('<Perimeter />', () => {
    it('is available', () => {
        expect(Perimeter).toBeDefined()
    })

    it('renders children', () => {
        const wrapper = mount(
            <Perimeter>
                <span>{'foo bar baz'}</span>
            </Perimeter>
        )

        expect(wrapper.contains(<span>{'foo bar baz'}</span>)).toBe(true)
    })

    it('handle click outside - we can\'t simulate standard mouse down event on the DOM', () => {
        const onClickOutside = jest.fn()

        const wrapper = mount(
            <Perimeter onClickOutside={onClickOutside}>
                <span>{'foo bar baz'}</span>
            </Perimeter>
        )

        wrapper.find(Perimeter).props().onClickOutside()

        expect(onClickOutside).toHaveBeenCalled()
    })
})
