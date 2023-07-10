import React from 'react'
import { mount } from 'enzyme'

import { Slider } from '..'

describe('<Slider />', () => {
    test('Is available', () => {
        expect(Slider).toBeDefined()
    })

    test('Snapshot', () => {
        const propsExample = {
            min: 0,
            max: 100,
            step: 10,
            value: 'Value',
            onChange: jest.fn(),
            mode: 'segmented',
            suffix: ' suffix',
            prefix: 'prefix ',
            error: 'errorValue'
        }

        const wrapper = mount(<Slider {...propsExample} />)

        expect(wrapper).toMatchSnapshot()
    })

    test('Should render ValueSelect if gets "options" prop', () => {
        const optionsValue = [
            {
                value: 'v1',
                title: 'Value 1'
            },
            {
                value: 'v2',
                title: 'Value 2'
            },
            {
                value: 'v3',
                title: 'Value 3'
            },
        ]

        const propsExample = {
            min: 0,
            max: 100,
            step: 10,
            value: 'Value',
            onChange: jest.fn(),
            mode: 'segmented',
            suffix: ' suffix',
            prefix: 'prefix ',
        }

        const wrapper = mount(<Slider {...propsExample} />)

        expect(wrapper.find('ValueSelect').exists()).toBeFalsy()

        wrapper.setProps({ options: optionsValue })

        expect(wrapper.find('ValueSelect').exists()).toBeTruthy()
    })

    test('Should\'nt render BaseSlider if gets "readonly" prop', () => {
        const propsExample = {
            min: 0,
            max: 100,
            step: 10,
            value: 'Value',
            onChange: jest.fn(),
            mode: 'segmented',
            suffix: ' suffix',
            prefix: 'prefix ',
        }

        const wrapper = mount(<Slider {...propsExample} />)

        expect(wrapper.find('BaseSlider').exists()).toBeTruthy()

        wrapper.setProps({ readonly: true })

        expect(wrapper.find('BaseSlider').exists()).toBeFalsy()
    })

    test('Should render boundaries', () => {
        const suffixExample = ' suffix'
        const prefixExample = 'prefix '
        const minExample = 0
        const maxExample = 4

        const propsExample = {
            min: minExample,
            max: maxExample,
            step: 10,
            onChange: jest.fn(),
            mode: 'segmented',
            value: '50',
            suffix: suffixExample,
            prefix: prefixExample
        }

        const wrapper = mount(<Slider {...propsExample} />).find('BoundariesStyled').find('p')

        expect(wrapper.children().first().text()).toBe(`${prefixExample}${minExample}${suffixExample}`)
        expect(wrapper.children().last().text()).toBe(`${prefixExample}${maxExample}${suffixExample}`)
    })
})
