import React from 'react'
import { shallow, mount } from 'enzyme'

import { TextField } from '..'

describe('<TextField />', () => {
    test('Is available', () => {
        expect(TextField).toBeDefined()
    })

    test('Snapshot', () => {
        const propsExample = {
            id: 'idValue',
            icon: 'iconExampleValue',
            placeholder: 'Текст',
            value: 'testValue',
            a11y: { label: 'Демонстрационное поле' },
            disabled: true,
            onClick: jest.fn(),
            onChange: jest.fn()
        }

        const wrapper = mount(<TextField {...propsExample} />)

        expect(wrapper).toMatchSnapshot()
    })

    test('Should trhow id for input', () => {
        const idValue = 'id-value-.-.'
        const wrapper = shallow(<TextField id={idValue} />).dive()

        expect(wrapper.children().first().prop('id')).toBe(idValue)
    })

    test('Should render additional text', () => {
        const additionalTextValue = 'Text that dreams of being main...'
        const wrapper = shallow(<TextField additionalText={additionalTextValue} />).dive()

        expect(wrapper.text()).toBe(additionalTextValue)
    })

    test('Should render additionalChild', () => {
        const additionalChildNode = <div id="additionalChild" />
        const wrapper = shallow(<TextField additionalChild={additionalChildNode} />).dive()

        expect(wrapper.contains(additionalChildNode)).toBeTruthy()
    })

    test('Should throw "disabled" prop for text input and additional child', () => {
        const additionalChildNode = <div id="additionalChild" />
        const wrapper = shallow(<TextField disabled additionalChild={additionalChildNode} />).dive()

        expect(wrapper.children().first().prop('disabled')).toBeTruthy()
        expect(wrapper.children().last().prop('disabled')).toBeTruthy()
    })

    test('Should throw "readonly" prop for additional child', () => {
        const additionalChildNode = <div id="additionalChild" />
        const wrapper = shallow(<TextField readonly additionalChild={additionalChildNode} />).dive()

        expect(wrapper.children().last().prop('readonly')).toBeTruthy()
    })

    test('Should throw "disabled" prop for text input if TextField is readonly', () => {
        const additionalChildNode = <div id="additionalChild" />
        const wrapper = shallow(<TextField readonly additionalChild={additionalChildNode} />).dive()

        expect(wrapper.children().first().prop('disabled')).not.toBeTruthy()
    })

    test('Should throw "focused" prop for wrapper when input was clicked', () => {
        const wrapper = shallow(<TextField size="md" />).dive()

        expect(wrapper.prop('focused')).toBeFalsy()

        wrapper.children().first()
            .simulate('click', {})

        expect(wrapper.prop('focused')).toBeTruthy()
    })

    test('Should throw formName for input', () => {
        const formNameValue = 'FormName'
        const wrapper = shallow(<TextField formName={formNameValue} />).dive()

        expect(wrapper.children().first().prop('form')).toBe(formNameValue)
    })

    test('Should throw placeholder for input', () => {
        const placeholderValue = 'PlaceholderValue'
        const wrapper = shallow(<TextField placeholder={placeholderValue} />).dive()

        expect(wrapper.children().first().prop('placeholder')).toBe(placeholderValue)
    })

    test('Should throw value for input', () => {
        const exampleValue = 'Cake is a lie!'
        const wrapper = shallow(<TextField value={exampleValue} />).dive()

        expect(wrapper.children().first().prop('value')).toBe(exampleValue)
    })

    test('Should correctly throw "focused" prop for wrapper when input was focused/unfocussed', () => {
        const wrapper = shallow(<TextField size="md" />).dive()

        expect(wrapper.prop('focused')).toBeFalsy()

        wrapper.children().first()
            .simulate('focus', {})

        expect(wrapper.prop('focused')).toBeTruthy()

        wrapper.children().first()
            .simulate('blur', {})

        expect(wrapper.prop('focused')).toBeFalsy()
    })

    test('Should correctly render button wrapper', () => {
        const a11yValues = { title: 'title' }
        const onClickMock = jest.fn()

        const wrapper1 = shallow(<TextField icon="icon" a11y={a11yValues} />).dive()

        expect(wrapper1.children().last().prop('as')).toBe('span')

        const wrapper2 = shallow(<TextField icon="icon" a11y={a11yValues} onClick={onClickMock} />).dive()

        expect(wrapper2.children().last().prop('as')).toBe('button')
    })

    test('Should call onFocus func when input was focused', () => {
        const onFocusMock = jest.fn()
        const wrapper = shallow(<TextField onFocus={onFocusMock} />).dive()

        expect(onFocusMock.mock.calls.length).toBe(0)

        wrapper.children().first()
            .simulate('focus', {})

        expect(onFocusMock.mock.calls.length).toBe(1)
    })

    test('Should call onBlur func when input was unfocussed', () => {
        const onBlurMock = jest.fn()
        const wrapper = shallow(<TextField onBlur={onBlurMock} />).dive()

        expect(onBlurMock.mock.calls.length).toBe(0)

        wrapper.children().first()
            .simulate('blur', {})

        expect(onBlurMock.mock.calls.length).toBe(1)
    })

    test('Should call onChange func when input was changed', () => {
        const onChangeMock = jest.fn()
        const wrapper = shallow(<TextField onChange={onChangeMock} />).dive()

        expect(onChangeMock.mock.calls.length).toBe(0)

        wrapper.children().first()
            .simulate('change', {})

        expect(onChangeMock.mock.calls.length).toBe(1)
    })

    test('Should\'nt call onChange func when input is disabled', () => {
        const onChangeMock = jest.fn()
        const wrapper = shallow(<TextField disabled onChange={onChangeMock} />).dive()

        expect(onChangeMock.mock.calls.length).toBe(0)

        wrapper.children().first()
            .simulate('change', {})

        expect(onChangeMock.mock.calls.length).toBe(0)
    })

    test('Should call onClick func if button was clicked', () => {
        const a11yValues = { title: 'title' }
        const onClickMock = jest.fn()
        const wrapper = shallow(<TextField icon="icon" a11y={a11yValues} onClick={onClickMock} />).dive()

        expect(onClickMock.mock.calls.length).toBe(0)

        wrapper.children().last()
            .simulate('click', {})

        expect(onClickMock.mock.calls.length).toBe(1)
    })
})
