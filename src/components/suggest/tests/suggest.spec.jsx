import React from 'react'
import { shallow } from 'enzyme'

import { Suggest } from '..'

describe('<Suggest />', () => {

    test('Is available', () => {
        expect(Suggest).toBeDefined()
    })

    test('Snapshot', () => {
        const onClickMock = jest.fn()
        const optionsValue = ['test0', 'test1', 'test2', 'test3', 'test4']

        const wrapper = shallow(<Suggest options={optionsValue} onClick={onClickMock} size="md" />)

        expect(wrapper).toMatchSnapshot()
    })

    test('Should render option text in every suggest', () => {
        const optionsValue = ['test0', 'test1', 'test2', 'test3', 'test4']
        const wrapper = shallow(<Suggest options={optionsValue} />)

        wrapper.find('SuggestButtonStyled').map((child, index) => expect(child.text()).toBe(optionsValue[index]))
    })

    test('Should call onClick only once for click', () => {
        const onClickMock = jest.fn()
        const optionsValue = ['test0', 'test1', 'test2', 'test3', 'test4']

        const wrapper = shallow(<Suggest options={optionsValue} onClick={onClickMock} />)

        expect(onClickMock.mock.calls.length).toBe(0)

        wrapper.find('SuggestButtonStyled').first()
            .simulate('click', {})

        expect(onClickMock.mock.calls.length).toBe(1)
    })

    test('Should return correct option value when suggest was clicked', () => {
        const onClickMock = jest.fn()
        const optionsValue = ['test0', 'test1', 'test2', 'test3', 'test4']

        const wrapper = shallow(<Suggest options={optionsValue} onClick={onClickMock} />)

        wrapper.find('SuggestButtonStyled').at(2)
            .simulate('click', {})

        expect(onClickMock.mock.calls[0][0]).toBe(optionsValue[2])

        wrapper.find('SuggestButtonStyled').at(4)
            .simulate('click', {})

        expect(onClickMock.mock.calls[1][0]).toBe(optionsValue[4])
    })

    test('Should\'nt call onClick if suggest is disabled', () => {
        const onClickMock = jest.fn()
        const optionsValue = ['test0', 'test1', 'test2', 'test3', 'test4']

        const wrapper = shallow(<Suggest options={optionsValue} onClick={onClickMock} disabled />)

        expect(onClickMock.mock.calls.length).toBe(0)

        wrapper.children().first()
            .simulate('click', {})

        expect(onClickMock.mock.calls.length).toBe(0)
    })
})
