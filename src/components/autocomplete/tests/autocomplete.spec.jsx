import React from 'react'
import { mount } from 'enzyme'

import { Autocomplete } from '..'
import { ValueOption } from '../../value-select'
import { keyCodes } from '../../utils/dropdown-utils'

describe('<Autocomplete />', () => {
    const optionsExample = [
        { title: 'Title 0', value: 'Value 0' },
        { title: 'Title 1', value: 'Value 1' },
        { title: 'Title 2', value: 'Value 2' },
        { title: 'Title 3', value: 'Value 3' },
        { title: 'Title 4', value: 'Value 4' }
    ]
    const propsExample = {
        id: 'example-id',
        placeholder: 'example-placeholder',
        size: 'lg',
    }
    let wrapper
    let onChangeMock

    beforeEach(() => {
        onChangeMock = jest.fn()

        wrapper = mount(
            <Autocomplete {...propsExample} onChange={onChangeMock}>
                {optionsExample.map(({ title, value }) =>
                    <ValueOption key={value} value={value} title={title} />
                )}
            </Autocomplete>
        )
    })

    test('Should be available', () => {
        expect(Autocomplete).toBeDefined()
    })

    test('Snapshot', () => {
        wrapper.setProps({ mode: 'loading' })

        expect(wrapper).toMatchSnapshot()
    })

    test('Should\'nt render Contents by default', () => {
        expect(wrapper.find('ContentsStyled').exists()).toBeFalsy()
    })

    test('Should render Contents when textField was focussed', () => {
        wrapper.find('input')
            .simulate('focus', { })

        expect(wrapper.find('ContentsStyled')).toHaveLength(1)
    })

    test('Should render noMatches translation in Contents if gets "noMatches" mode', () => {
        const noMatchesTranslationExample = 'blah-blah-blah-noMatches'

        wrapper.setProps({
            mode: 'noMatches',
            translations: { noMatches: noMatchesTranslationExample }
        })

        wrapper.find('input')
            .simulate('focus', { })

        expect(wrapper.find('ContentsStyled').text()).toBe(noMatchesTranslationExample)
    })

    test('Should render loadingError translation in Contents if gets "error" mode', () => {
        const loadingErrorTranslationExample = 'blah-blah-blah-loadingError'

        wrapper.setProps({
            mode: 'error',
            translations: { loadingError: loadingErrorTranslationExample }
        })

        wrapper.find('input')
            .simulate('focus', { })

        expect(wrapper.find('ContentsStyled').text()).toBe(loadingErrorTranslationExample)
    })

    test('Should render ContainedLoader in Contents if gets "loading" mode', () => {
        wrapper.setProps({ mode: 'loading' })

        wrapper.find('input')
            .simulate('focus', { })

        expect(wrapper.find('ContentsStyled').find('ContainedLoader')).toHaveLength(1)
    })

    test('Should return empty value if ESC button was pressed', () => {
        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_ESCAPE })
        
        expect(onChangeMock.mock.calls[0][0]).toBe('')
    })

    test('Should\'nt call onChange if pressed only enter key', () => {
        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })

        expect(onChangeMock.mock.calls).toHaveLength(0)
    })

    test('Should return first option\'s value and title if pressed home key and then option was choosed', () => {
        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_HOME })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].title)
        expect(onChangeMock.mock.calls[0][1]).toBe(optionsExample[0].value)
    })

    test('Should return last option\'s value and title if pressed end key and then option was choosed', () => {
        const lastOptionIndex = optionsExample.length - 1

        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_END })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[lastOptionIndex].title)
        expect(onChangeMock.mock.calls[0][1]).toBe(optionsExample[lastOptionIndex].value)
    })

    test('Should return first option\'s value and title if pressed arrow down and then option was choosed', () => {
        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_ARROW_DOWN })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[0].title)
        expect(onChangeMock.mock.calls[0][1]).toBe(optionsExample[0].value)
    })

    test('Should return penultimate option\'s value and title if pressed end key then pressed arrow up and then option was choosed', () => {
        const lastOptionIndex = optionsExample.length - 1

        wrapper.find('input')
            .simulate('keydown', { keyCode: keyCodes.KEY_END })
            .simulate('keydown', { keyCode: keyCodes.KEY_ARROW_UP })
            .simulate('keydown', { keyCode: keyCodes.KEY_ENTER })
        
        expect(onChangeMock.mock.calls[0][0]).toBe(optionsExample[lastOptionIndex - 1].title)
        expect(onChangeMock.mock.calls[0][1]).toBe(optionsExample[lastOptionIndex - 1].value)
    })

    test('Should\'nt render Contents if Tab key was pressed', () => {
        wrapper.find('input')
            .simulate('focus', {})
            .simulate('keydown', { keyCode: keyCodes.KEY_TAB })
        
        expect(wrapper.find('ContentsStyled').exists()).toBeFalsy()
    })
})
