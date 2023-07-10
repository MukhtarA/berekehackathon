import React from 'react'
import { shallow } from 'enzyme'

import { BaseSlider } from '../base-slider'

describe('BaseSlider', () => {
    test('Should be available', () => {
        expect(BaseSlider).toBeDefined()
    })

    test('Should\'nt render segments if mode does\'nt set or not "segmented"', () => {
        const wrapper = shallow(<BaseSlider value="hmmm" />)

        expect(wrapper.find('Segments').length).toBe(0)
    })

    test('Should render segments if gets "segmented" mode', () => {
        const wrapper = shallow(<BaseSlider value="hmmm" mode="segmented" />)

        expect(wrapper.find('Segments').length).toBe(1)
    })

    test('Should call addSliderHandlers if gets mousedown event', () => {
        const addSliderHandlersMock = jest.fn()
        const wrapper = shallow(<BaseSlider value="50" addSliderHandlers={addSliderHandlersMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }

        expect(addSliderHandlersMock.mock.calls).toHaveLength(0)

        wrapper.find('TrackStyled')
            .simulate('mousedown', { pageX: 0 })

        expect(addSliderHandlersMock.mock.calls).toHaveLength(1)
    })

    test('Should\'nt call addSliderHandlers if disabled and gets mousedown event', () => {
        const addSliderHandlersMock = jest.fn()
        const wrapper = shallow(<BaseSlider disabled value="50" addSliderHandlers={addSliderHandlersMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }

        expect(addSliderHandlersMock.mock.calls).toHaveLength(0)

        wrapper.find('TrackStyled')
            .simulate('mousedown', { pageX: 0 })

        expect(addSliderHandlersMock.mock.calls).toHaveLength(0)
    })

    test('Should call onChange if gets mousedown event', () => {
        const onChangeMock = jest.fn()
        const wrapper = shallow(<BaseSlider value="50" onChange={onChangeMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }

        expect(onChangeMock.mock.calls).toHaveLength(0)

        wrapper.find('TrackStyled')
            .simulate('mousedown', { pageX: 0 })

        expect(onChangeMock.mock.calls).toHaveLength(1)
    })

    test('Should\'nt call onChange if disabled and gets mousedown event', () => {
        const onChangeMock = jest.fn()
        const wrapper = shallow(<BaseSlider disabled value="50" onChange={onChangeMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }

        expect(onChangeMock.mock.calls).toHaveLength(0)

        wrapper.find('TrackStyled')
            .simulate('mousedown', { pageX: 0 })

        expect(onChangeMock.mock.calls).toHaveLength(0)
    })

    test('Should call removeSliderHandlers if gets mouseup event', () => {
        const removeSliderHandlersMock = jest.fn()
        const wrapper = shallow(<BaseSlider value="50" removeSliderHandlers={removeSliderHandlersMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }
        
        expect(removeSliderHandlersMock.mock.calls).toHaveLength(0)

        wrapper.instance().handleMouseUp({ pageX: 0 })

        expect(removeSliderHandlersMock.mock.calls).toHaveLength(1)
    })

    test('Should call onChange if gets mouseup event', () => {
        const onChangeMock = jest.fn()
        const wrapper = shallow(<BaseSlider value="50" onChange={onChangeMock} />)

        wrapper.instance().track = { clientLeft: 0, getBoundingClientRect: () => ({ left: 0 }), clientWidth: 0 }

        expect(onChangeMock.mock.calls).toHaveLength(0)

        wrapper.instance().handleMouseUp({ pageX: 0 })

        expect(onChangeMock.mock.calls).toHaveLength(1)
    })

    test('Should call removeSliderHandlers if component was unmounted', () => {
        const removeSliderHandlersMock = jest.fn()
        const wrapper = shallow(<BaseSlider value="50" removeSliderHandlers={removeSliderHandlersMock} />)

        expect(removeSliderHandlersMock.mock.calls).toHaveLength(0)

        wrapper.unmount()

        expect(removeSliderHandlersMock.mock.calls).toHaveLength(1)
    })
})
