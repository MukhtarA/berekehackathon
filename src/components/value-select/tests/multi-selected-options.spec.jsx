import React from 'react'
import { shallow } from 'enzyme'

import { MultiSelectedOptions } from '../multi-selected-options'

describe('MultiSelectedOptions', () => {
    const optionsExample = [
        { title: 'Title 0', value: 'Value 0' },
        { title: 'Title 1', value: 'Value 1' },
        { title: 'Title 2', value: 'Value 2' },
    ]
    const propsExample = {
        size: 'lg',
        options: optionsExample,
    }
    let onChangeMock
    let wrapper

    beforeEach(() => {
        onChangeMock = jest.fn()

        wrapper = shallow(<MultiSelectedOptions {...propsExample} onChange={onChangeMock} />)
    })

    test('Should be available', () => {
        expect(MultiSelectedOptions).toBeDefined()
    })

    test('Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Should\'nt render close button if gets disabled prop', () => {
        wrapper.setProps({ disabled: true })

        expect(wrapper.find('MultiSelectedButtonStyled').exists()).toBeFalsy()
    })

    test('Should\'nt call onChange w/o any actions', () => {
        expect(onChangeMock.mock.calls).toHaveLength(0)
    })

    test('Should call onChange if option remove button was clicked', () => {
        wrapper.children().last().find('MultiSelectedButtonStyled')
            .simulate('click', { stopPropagation: jest.fn() })

        expect(onChangeMock.mock.calls).toHaveLength(1)
    })

    test('Should return updated option values array if option remove button was clicked', () => {
        wrapper.childAt(1).find('MultiSelectedButtonStyled')
            .simulate('click', { stopPropagation: jest.fn() })

        expect(onChangeMock.mock.calls[0][0]).toEqual(
            expect.not.arrayContaining([optionsExample[1].value])
        )
    })
})
