import React from 'react'
import { mount } from 'enzyme'

import { ValueSelect, ValueOption } from '..'
import { keyCodes } from '../utils'

describe('<Autocomplete />', () => {
    const optionsExample = [
        { title: 'Title 0', value: 'Value 0' },
        { title: 'Title 1', value: 'Value 1' },
        { title: 'Title 2', value: 'Value 2' },
    ]
    const propsExample = {
        id: 'example-id',
        size: 'lg',
        mode: 'select',
        translations: {
            placeholder: 'placeholderExample'
        }
    }
    let wrapper
    let onChangeMock

    beforeEach(() => {
        onChangeMock = jest.fn()

        wrapper = mount(
            <ValueSelect {...propsExample} onChange={onChangeMock} >
                {optionsExample.map(({ title, value }) =>
                    <ValueOption key={value} value={value} title={title} />
                )}
            </ValueSelect>
        )
    })

    test('Should be available', () => {
        expect(ValueSelect).toBeDefined()
    })

    test('Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Should\'nt render Contents by default', () => {
        expect(wrapper.find('ContentsStyled').exists()).toBeFalsy()
    })

    test('Should render Contents when component was focussed', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })

        expect(wrapper.find('ContentsStyled')).toHaveLength(1)
    })

    test('Should return first option value if pressed only enter key', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })

        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].value)
    })

    test('Should return first option value if pressed only space key', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_SPACE })

        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].value)
    })

    test('Should return first option value if gets autoselect mode', () => {
        wrapper.setProps({ mode: 'autoselect' })

        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].value)
    })

    test('Should return first option\'s value if pressed home key and then option was choosed', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_HOME })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].value)
    })

    test('Should return last option\'s value if pressed end key and then option was choosed', () => {
        const lastOptionIndex = optionsExample.length - 1

        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_END })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[lastOptionIndex].value)
    })

    test('Should return second option\'s value if pressed arrow down and then option was choosed', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_ARROW_DOWN })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[1].value)
    })

    test('Should return penultimate option\'s value if pressed end key then pressed arrow up and then option was choosed', () => {
        const lastOptionIndex = optionsExample.length - 1

        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_END })
            .simulate('keydown', { keyCode: keyCodes.KEY_ARROW_UP })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[lastOptionIndex - 1].value)
    })

    test('Should\'nt render Contents if Tab key was pressed', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_TAB })
        
        expect(wrapper.find('ContentsStyled').exists()).toBeFalsy()
    })

    test('Should\'nt render Contents if esc key was pressed', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_ESCAPE })
        
        expect(wrapper.find('ContentsStyled').exists()).toBeFalsy()
    })

    test('Should render MultiSelectedOptions if gets multiselect mode', () => {
        wrapper.setProps({ mode: 'multiselect', value: ['Value 0', 'Value 1'] })

        expect(wrapper.find('MultiSelectedOptions')).toHaveLength(1)
    })

    test('Should\'nt call onChange if pressed ctrl + a w/o multiselect mode', () => {
        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_A, ctrlKey: true })

        expect(onChangeMock.mock.calls).toHaveLength(0)
    })

    test('Should return array w/ all options values if pressed ctrl + a w/ multiselect mode', () => {
        wrapper.setProps({ mode: 'multiselect', value: ['Value 0'] })

        wrapper.find('TargetStyled')
            .simulate('click', { })
        
        wrapper.find('ContentsViewStyled')
            .simulate('keydown', { keyCode: keyCodes.KEY_A, ctrlKey: true })

        expect(onChangeMock.mock.calls[0][0]).toEqual(
            optionsExample.map(({ value }) => value)
        )
    })
})
