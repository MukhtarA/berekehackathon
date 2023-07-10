import React from 'react'
import { mount } from 'enzyme'

import { TextFieldCounter } from '..'
import { CounterControl } from '../counter-control'

const ARROW_UP_KEY_CODE = 38
const ARROW_DOWN_KEY_CODE = 40
const HOME_BUTTON_KEY_CODE = 36
const END_BUTTON_KEY_CODE = 35
const PAGE_UP_BUTTON_KEY_CODE = 33
const PAGE_DOWN_BUTTON_KEY_CODE = 34

describe('<TextFieldCounter />', () => {

    test('Is available', () => {
        expect(TextFieldCounter).toBeDefined()
    })

    test('Snapshot', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 0,
            max: 8,
            step: 1,
            value: '2',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        expect(wrapper).toMatchSnapshot()
    })

    test('Should render 2 CounterControls', () => {
        const wrapper = mount(<TextFieldCounter />)

        expect(wrapper.find(CounterControl).length).toBe(2)
    })

    test('Should call onChange func if counter controls was clicked', () => {
        const onChangeMock = jest.fn()

        const propsExample = {
            min: 0,
            max: 8,
            step: 1,
            value: '2',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        expect(onChangeMock.mock.calls.length).toBe(0)

        wrapper.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls.length).toBe(1)

        wrapper.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls.length).toBe(2)
    })

    test('Should decrease value if decrease button was clicked', () => {
        const onChangeMock = jest.fn()

        const propsExample = {
            min: 0,
            max: 8,
            step: 1,
            value: '2',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('1')
    })

    test('Should increase value if increase button was clicked', () => {
        const onChangeMock = jest.fn()

        const propsExample = {
            min: 0,
            max: 8,
            step: 1,
            value: '2',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('3')
    })

    test('Should increase value on any step', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 0,
            max: 36,
            value: '2',
            onChange: onChangeMock
        }

        const stepValue1 = 6
        const wrapper1 = mount(<TextFieldCounter {...propsExample} step={stepValue1} />)

        wrapper1.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('8')

        const stepValue2 = 10
        const wrapper2 = mount(<TextFieldCounter {...propsExample} step={stepValue2} />)

        wrapper2.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[1][0]).toBe('12')
    })

    test('Should decrease value on any step', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 0,
            max: 36,
            value: '16',
            onChange: onChangeMock
        }

        const stepValue1 = 6
        const wrapper1 = mount(<TextFieldCounter {...propsExample} step={stepValue1} />)

        wrapper1.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('10')

        const stepValue2 = 10
        const wrapper2 = mount(<TextFieldCounter {...propsExample} step={stepValue2} />)

        wrapper2.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[1][0]).toBe('6')
    })

    test('Should set max value if increase button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 4,
            value: '18',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('20')
    })


    test('Should set min value if decrease button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 8,
            value: '7',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls[0][0]).toBe('5')
    })

    test('Should\'nt call on Change if counter is disabled', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 16,
            step: 2,
            value: '12',
            onChange: onChangeMock,
            disabled: true
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('button').first()
            .simulate('click', {})

        wrapper.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls.length).toBe(0)
    })

    test('Should\'nt call onChange if value equals limit value', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 16,
            step: 4,
            onChange: onChangeMock
        }

        const wrapper1 = mount(<TextFieldCounter {...propsExample} value="16" />)

        wrapper1.find('button').last()
            .simulate('click', {})

        expect(onChangeMock.mock.calls.length).toBe(0)

        const wrapper2 = mount(<TextFieldCounter {...propsExample} value="5" />)

        wrapper2.find('button').first()
            .simulate('click', {})

        expect(onChangeMock.mock.calls.length).toBe(0)
    })

    test('Should correctly change value if arrow up was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: ARROW_UP_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('16')
    })

    test('Should correctly change value if arrow down was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: ARROW_DOWN_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('12')
    })

    test('Should correctly change value if home button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: HOME_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('5')
    })

    test('Should set zero value if home button was pressed without min value', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            max: 20,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: HOME_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('0')
    })

    test('Should correctly change value if end button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 20,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: END_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('20')
    })

    test('Should\'nt call onChange if end button was pressed without max value', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: END_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls.length).toBe(0)
    })

    test('Should correctly change value if page up button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 100,
            step: 2,
            value: '14',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: PAGE_UP_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('34')
    })

    test('Should correctly change value if page up button was pressed', () => {
        const onChangeMock = jest.fn()
        const propsExample = {
            min: 5,
            max: 100,
            step: 2,
            value: '53',
            onChange: onChangeMock
        }

        const wrapper = mount(<TextFieldCounter {...propsExample} />)

        wrapper.find('input')
            .simulate('keydown', { keyCode: PAGE_DOWN_BUTTON_KEY_CODE })

        expect(onChangeMock.mock.calls[0][0]).toBe('33')
    })
})
