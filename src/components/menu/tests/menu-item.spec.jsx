import React from 'react'
import { shallow } from 'enzyme'

import { MenuItem } from '..'

describe('<MenuItem />', () => {
    test('is available', () => {
        expect(MenuItem).toBeDefined()
    })

    test('Snapshot', () => {
        const wrapper = shallow(
            <div>
                <MenuItem title="testTitle" />
                <MenuItem icon="icon:core/cards/mc-36-mastercard-black-edition" />
                <MenuItem icon="icon:core/cards/mc-36-mastercard-black-edition" title="testTitle" />
            </div>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('Should render title', () => {
        const title = 'Exactly NOT MenuItem title'
        const wrapper = shallow(
            <MenuItem title={title} />
        )

        expect(wrapper.text()).toBe(title)
    })

    test('Should call onClick and onClose functions when MenuItem was clicked', () => {
        const onClickMock = jest.fn()
        const onCloseMock = jest.fn()
        const wrapper = shallow(
            <MenuItem title="testTitle" onClick={onClickMock} onClose={onCloseMock} />

        )

        expect(onClickMock.mock.calls.length).toBe(0)
        expect(onCloseMock.mock.calls.length).toBe(0)

        wrapper.find('button')
            .simulate('click', {})

        expect(onClickMock.mock.calls.length).toBe(1)
        expect(onCloseMock.mock.calls.length).toBe(1)
    })
})
