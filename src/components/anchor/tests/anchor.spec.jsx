import React from 'react'
import { shallow } from 'enzyme'

import { Anchor, AnchorLink } from '..'

describe('<Anchor />', () => {

    test('is available', () => {
        expect(Anchor).toBeDefined()
    })

    test('snapshot', () => {
        const wrapper = shallow(
            <Anchor>
                <AnchorLink title="0" >{'0'}</AnchorLink>
                <AnchorLink title="1" >{'1'}</AnchorLink>
            </Anchor>
        )

        expect(wrapper).toMatchSnapshot()
    })

    test('Throwing size and colorScheme for tabs', () => {
        const inputProps1 = {
            size: 'sm',
            colorScheme: 'pink5',
        }

        const wrapper1 = shallow(
            <Anchor {...inputProps1}>
                <AnchorLink title="0" />
                <AnchorLink title="1" />
                <AnchorLink title="2" />
            </Anchor>
        )

        wrapper1.find(AnchorLink).forEach((link) => {
            expect(link.props()).toMatchObject(inputProps1)
        })

        const inputProps2 = {
            size: 'lg',
            colorScheme: 'orange5',
        }

        const wrapper2 = shallow(
            <Anchor {...inputProps2} >
                <AnchorLink title="0" />
                <AnchorLink title="1" />
                <AnchorLink title="2" />
            </Anchor>
        )
        
        wrapper2.find(AnchorLink).forEach((link) => {
            expect(link.props()).toMatchObject(inputProps2)
        })
    })

    test('With inintial value should throw forceOpened prop for correct AnchorLink', () => {
        const wrapper1 = shallow(
            <Anchor initialValue="1">
                <AnchorLink title="0" />
                <AnchorLink title="1" />
                <AnchorLink title="2" />
            </Anchor>
        )

        wrapper1.find(AnchorLink).forEach((link, i) => {
            if (i === 1) {
                expect(link.props().forceOpened).toBe(true)
            } else {
                expect(link.props().forceOpened).toBe(false)
            }
        })
        
        const wrapper2 = shallow(
            <Anchor initialValue="2">
                <AnchorLink title="0" />
                <AnchorLink title="1" />
                <AnchorLink title="2" />
            </Anchor>
        )

        wrapper2.find(AnchorLink).forEach((link, i) => {
            if (i === 2) {
                expect(link.props().forceOpened).toBe(true)
            } else {
                expect(link.props().forceOpened).toBe(false)
            }
        })
    })
})
