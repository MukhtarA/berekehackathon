import React from 'react'
import { shallow } from 'enzyme'

import { Banner } from '../banner'

describe('<Banner />', () => {
    it('is available', () => {
        expect(Banner).toBeDefined()
    })


    it('renders title, description, children', () => {
        const wrapper = shallow(
            <Banner title="Заголовок" description="описание">
                <span>{'foo bar baz'}</span>
            </Banner>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('Headline3').length).toBe(1)
        expect(wrapper.contains('Заголовок')).toBeTruthy()
        expect(wrapper.contains('описание')).toBeTruthy()
        expect(wrapper.contains(<span>{'foo bar baz'}</span>)).toBeTruthy()
    })
})
