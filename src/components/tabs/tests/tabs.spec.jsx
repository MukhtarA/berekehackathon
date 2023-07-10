import React from 'react'
import { shallow, mount } from 'enzyme'

import { Tabs, Tab } from '..'

describe('<Tabs />', () => {
    
    test('is available', () => {
        expect(Tabs).toBeDefined()
    })

    test('snapshot', () => {
        const wrapper = shallow(
            <Tabs>
                <Tab title="0" >{'0'}</Tab>
                <Tab title="1" >{'1'}</Tab>
            </Tabs>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('Throwing size and colorScheme for tabs', () => {
        const inputProps1 = {
            size: 'sm',
            colorScheme: 'pink5',
        }

        const wrapper1 = shallow(
            <Tabs {...inputProps1}>
                <Tab title="0" />
                <Tab title="1" />
                <Tab title="2" />
            </Tabs>
        )

        wrapper1.find(Tab).forEach((link) => {
            expect(link.props()).toMatchObject(inputProps1)
        })

        const inputProps2 = {
            size: 'lg',
            colorScheme: 'orange5',
        }

        const wrapper2 = shallow(
            <Tabs {...inputProps2}>
                <Tab title="0" />
                <Tab title="1" />
                <Tab title="2" />
            </Tabs>
        )

        wrapper2.find(Tab).forEach((link) => {
            expect(link.props()).toMatchObject(inputProps2)
        })
    })

    test('With inintial value should throw forceOpened prop for correct Tab', () => {
        const wrapper1 = shallow(
            <Tabs initialValue="1">
                <Tab title="0" />
                <Tab title="1" />
                <Tab title="2" />
            </Tabs>
        )

        wrapper1.find(Tab).forEach((link, i) => {
            if (i === 1) {
                expect(link.props().forceOpened).toBe(true)
            } else {
                expect(link.props().forceOpened).toBe(false)
            }
        })
        
        const wrapper2 = shallow(
            <Tabs initialValue="2">
                <Tab title="0" />
                <Tab title="1" />
                <Tab title="2" />
            </Tabs>
        )

        wrapper2.find(Tab).forEach((link, i) => {
            if (i === 2) {
                expect(link.props().forceOpened).toBe(true)
            } else {
                expect(link.props().forceOpened).toBe(false)
            }
        })
    })

    test('doesn\'t change on click on current tab', () => {
        const wrapper = mount(
            <Tabs>
                <Tab title="0" >{'a'}</Tab>
                <Tab title="1" >{'b'}</Tab>
                <Tab title="2" >{'c'}</Tab>
            </Tabs>
        )

        expect(wrapper.find('[role="tabpanel"]').children().text()).toBe('a')

        wrapper.find('[role="tablist"]').children().first()
            .simulate('click')
        expect(wrapper.find('[role="tabpanel"]').children().text()).toBe('a')
    })

    test('should change tabs', () => {
        const wrapper = mount(
            <Tabs initialValue="1">
                <Tab title="0" >{'a'}</Tab>
                <Tab title="1" >{'b'}</Tab>
                <Tab title="2" >{'c'}</Tab>
            </Tabs>
        )

        expect(wrapper.find('[role="tabpanel"]').children().text()).toBe('b')
        
        wrapper.find('[role="tablist"]').children().first()
            .simulate('click')

        expect(wrapper.find('[role="tabpanel"]').children().text()).toBe('a')

        wrapper.find('[role="tablist"]').children().last()
            .simulate('click')

        expect(wrapper.find('[role="tabpanel"]').children().text()).toBe('c')
    })
})
