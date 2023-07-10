import React from 'react'
import { shallow } from 'enzyme'

import { Segments } from '../segments'

describe('Segments', () => {
    test('Is available', () => {
        expect(Segments).toBeDefined()
    })

    test('Should render correct num of segments', () => {
        const wrapper1 = shallow(<Segments min={0} max={30} step={3} />)

        expect(wrapper1.children().length).toBe(9)

        const wrapper2 = shallow(<Segments min={0} max={20} step={1} />)

        expect(wrapper2.children().length).toBe(19)
    })

    test('Should\'nt render segments if no args or no delimiters', () => {
        const wrapper1 = shallow(<Segments />)

        expect(wrapper1.html()).toBeNull()

        const wrapper2 = shallow(<Segments min={1} max={10} step={0} />)

        expect(wrapper2.html()).toBeNull()
    })
})
