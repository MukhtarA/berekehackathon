import React from 'react'
import { shallow } from 'enzyme'

import { Menu, MenuBlock, MenuItem } from '..'

describe('<Menu />', () => {
    test('is available', () => {
        expect(Menu).toBeDefined()
    })

    test('Snapshot', () => {
        const wrapper = shallow(
            <Menu a11y={{ title: 'Menu' }}>
                <MenuBlock a11y={{ title: 'first MenuBlock' }}>
                    <MenuItem title="TITLE" />
                </MenuBlock>

                <MenuBlock a11y={{ title: 'second MenuBlock' }}>
                    <MenuItem />
                    <MenuItem title="MenuItem 2" />
                    <MenuItem icon="icon:core/cards/mc-36-mastercard-black-edition" />
                    <MenuItem icon="icon:core/cards/mc-36-mir-sbercard-level-1" title="MenuItem 3" />
                </MenuBlock>
            </Menu>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('Should throw menu title', () => {
        const menuTitle = 'Exactly NOT menu title'
        const wrapper = shallow(
            <Menu title={menuTitle}>
                <MenuItem />
                <MenuItem />
            </Menu>
        ).children().first().shallow()

        expect(wrapper.children().first().text()).toBe(menuTitle)
    })

    test('Should throw size for all children', () => {
        const wrapper1 = shallow(
            <Menu size="md" title="ochen' creative zagolovok">
                <MenuItem />
                <MenuItem />
            </Menu>
        ).children().first().shallow()

        wrapper1.children().map((child) => expect(child.props().size).toBe('md'))

        const wrapper2 = shallow(
            <Menu size="lg" title="Boring title">
                <MenuItem />
                <MenuItem />
            </Menu>
        ).children().first().shallow()

        wrapper2.children().map((child) => expect(child.props().size).toBe('lg'))
    })

    test('Should throw position', () => {
        const wrapper1 = shallow(
            <Menu position="overlay" title="ochen' creative zagolovok">
                <MenuItem />
                <MenuItem />
            </Menu>
        )

        expect(wrapper1.children().first().props().position).toBe('overlay')

        const wrapper2 = shallow(
            <Menu position="normal" title="Boring title">
                <MenuItem />
                <MenuItem />
            </Menu>
        )

        expect(wrapper2.children().first().props().position).toBe('normal')
    })

    test('Should correctly throwing "expanded" prop when over/out mouse pointer on menu w/ "hover" mode ', () => {
        const wrapper = shallow(
            <Menu mode="hover" title="testTitle">
                <MenuItem />
                <MenuItem />
            </Menu>
        )

        expect(wrapper.children().first().props().expanded).toBeFalsy()

        wrapper.children().first()
            .simulate('mouseenter')

        expect(wrapper.children().first().props().expanded).toBeTruthy()

        wrapper.children().first()
            .simulate('mouseleave')

        expect(wrapper.children().first().props().expanded).toBeFalsy()
    })

    test('Should correctly throwing "expanded" prop when clicking on menu w/ "click" mode ', () => {
        const wrapper = shallow(
            <Menu mode="click" title="testTitle">
                <MenuItem />
                <MenuItem />
            </Menu>
        )

        expect(wrapper.children().first().props().expanded).toBeFalsy()

        wrapper.children().first().children().first()
            .simulate('click', {})

        expect(wrapper.children().first().props().expanded).toBeTruthy()

        wrapper.children().first().children().first()
            .simulate('click', {})

        expect(wrapper.children().first().props().expanded).toBeFalsy()
    })
})
