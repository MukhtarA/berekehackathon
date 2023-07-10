import React from 'react'
import { shallow } from 'enzyme'

import { MenuBlock, MenuItem } from '..'

describe('<MenuBlock />', () => {
    test('is available', () => {
        expect(MenuBlock).toBeDefined()
    })

    test('Snapshot', () => {
        const wrapper = shallow(
            <MenuBlock a11y={{ title: 'hmm' }}>
                <MenuItem />
            </MenuBlock>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('Should throw onClose for children', () => {
        const onCloseMock = jest.fn()
        const wrapper = shallow(
            <MenuBlock a11y={{ title: 'HMM' }} onClose={onCloseMock}>
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </MenuBlock>
        )

        wrapper.find('ul').children().map((child) => expect(child.props().onClose).toBe(onCloseMock))
        
    })

    test('Should throw activeDescendant for children', () => {
        const activeDescendantValue = 'Important value btw'
        const wrapper = shallow(
            <MenuBlock a11y={{ title: 'Hmmmm...' }} activeDescendant={activeDescendantValue}>
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </MenuBlock>
        )

        wrapper.find('ul').children().map((child) => expect(child.props().activeDescendant).toBe(activeDescendantValue))
    })
})
