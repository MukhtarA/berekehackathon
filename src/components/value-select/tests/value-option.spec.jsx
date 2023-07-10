import React from 'react'
import { shallow } from 'enzyme'

import { ValueOption } from '..'

describe('<ValueOption />', () => {

    test('Should be available', () => {
        expect(ValueOption).toBeDefined()
    })
    
    test('Snapshot', () => {
        const wrapper = shallow(
            <ValueOption
                size="lg"
                value="value-example"
                icon="icon:core/iconNameExample"
                title="title-example"
                description="description-example"
                additional="additional-title-example"
                additionalDescription="additional-description-example"
            />
        )

        expect(wrapper).toMatchSnapshot()
    })
})
