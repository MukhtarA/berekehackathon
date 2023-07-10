import React from 'react'
import { shallow } from 'enzyme'

import { ValueSubheader } from '..'

describe('<ValueSubheader />', () => {

    test('Should be available', () => {
        expect(ValueSubheader).toBeDefined()
    })

    test('Snapshot', () => {
        const wrapper = shallow(<ValueSubheader title="mmm-title-example" size="lg" />)

        expect(wrapper).toMatchSnapshot()
    })
})
