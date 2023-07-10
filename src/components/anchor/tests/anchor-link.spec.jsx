import React from 'react'
import { shallow } from 'enzyme'

import { AnchorLink } from '..'

describe('<AnchorLink />', () => {

    test('is available', () => {
        expect(AnchorLink).toBeDefined()
    })

    test('should render title as label', () => {
        const titleText1 = 'TestLabel'
        const wrapper1 = shallow(<AnchorLink title={titleText1} />)

        expect(wrapper1.text()).toBe(titleText1)

        const titleText2 = 'SimpleText'
        const wrapper2 = shallow(<AnchorLink title={titleText2} />)

        expect(wrapper2.text()).toBe(titleText2)
    })

    test('should get "selected" status if gets forcedOpen prop', () => {
        const wrapper1 = shallow(<AnchorLink title="qwe" />)

        expect(wrapper1.at(0).props()).not.toMatchObject({ selected: true })

        const wrapper2 = shallow(<AnchorLink title="qwe" forceOpened />)

        expect(wrapper2.at(0).props()).toMatchObject({ selected: true })
    })
})
