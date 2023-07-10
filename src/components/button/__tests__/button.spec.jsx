import React from 'react'
import { shallow, mount } from 'enzyme'
import { matchers } from '@emotion/jest'

import { ButtonSecondary, ButtonTertiary, ButtonTransparent, ButtonPrimary } from '..'

expect.extend(matchers)

describe('<Button />', () => {
    test('is available', () => {
        expect(ButtonPrimary).toBeDefined()
        expect(ButtonSecondary).toBeDefined()
        expect(ButtonTertiary).toBeDefined()
        expect(ButtonTransparent).toBeDefined()
    })

    test('renders title', () => {
        const wrapper = shallow(<ButtonSecondary title="title" />)

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.text('title')).toBeTruthy()
    })

    test('fire onClick handler', () => {
        const clickHandler = jest.fn()
        const defaultProps = {
            onClick: clickHandler,
            title: 'title'
        }
        const wrapper = shallow(<ButtonPrimary {...defaultProps} />)
        expect(clickHandler).not.toHaveBeenCalled()
        wrapper.simulate('click')
        expect(clickHandler).toHaveBeenCalled()
    })

    test('does not fire onClick handler if disabled', () => {
        const clickHandler = jest.fn()
        const defaultProps = {
            onClick: clickHandler,
            title: 'title',
            disabled: true
        }
        const wrapper = mount(<ButtonPrimary {...defaultProps} />)
        expect(clickHandler).not.toHaveBeenCalled()
        wrapper.simulate('click')
        expect(clickHandler).not.toHaveBeenCalled()
    })

    test('renders loading', () => {
        const wrapper = shallow(<ButtonPrimary title="title" />)
        expect(wrapper.props().loading).not.toBe(true)
        const wrapper2 = shallow(<ButtonPrimary title="title" loading />)
        expect(wrapper2.props().isLoading).toBe(true)
    })

    test('does not fire onClick handler if loading', () => {
        const clickHandler = jest.fn()
        const defaultProps = {
            onClick: clickHandler,
            title: 'title',
            loading: true
        }
        const wrapper = mount(<ButtonPrimary {...defaultProps} />)
        expect(clickHandler).not.toHaveBeenCalled()
        wrapper.simulate('click')
        expect(clickHandler).not.toHaveBeenCalled()
    })

    test('does disabled if loading', () => {
        const wrapper = mount(<ButtonPrimary title="title" loading disabled />)
        expect(wrapper.props().disabled).toBe(true)
    })

})
