import React from 'react'
import { addYears } from 'date-fns'
import { act } from 'react-dom/test-utils'
import { mount } from 'enzyme'
import { matchers } from '@emotion/jest'
import { ThemeProvider } from '@emotion/react'
import * as LIGHT_THEME from '../../styles/light.theme.style'

import { TextFieldMasked } from '../../text-field/masked'
import { Calendar } from '../calendar'

expect.extend(matchers)

describe('<Calendar />', () => {
    it('should be defined', () => {        
        expect(Calendar).toBeDefined()
    })

    it('should have an empty text field', () => {
        const calendar = mount(<Calendar />)
        const textField = calendar.find('input')

        expect(textField.length).toEqual(1)
        expect(textField.instance().value).toBe('__.__.____')
    })

    it('should have a filled text field by default', () => {
        const date = new Date()
        const initialDate = date.toISOString()
        const calendar = mount(<Calendar initialDate={initialDate} />)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        
        expect(calendar.find('input').instance().value).toBe(`${day}.${month}.${year}`)
    })

    it('should change a text field value', () => {
        const date = new Date()
        const calendar = mount(<Calendar />)
        const textField = calendar.find(TextFieldMasked)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        act(() => {
            textField.props().onChange(null, { masked: {
                isComplete: true,
                date
            } })
        })

        expect(calendar.find('input').instance().value).toBe(`${day}.${month}.${year}`)
    })


    // TODO: допишу в следующей итерации
    // it('should have an errored text field', () => {
    //     const date = new Date()
    //     const restriction = {
    //         start: date,
    //         end: addYears(date, 1)
    //     }
    //     const calendar = mount(<Calendar restriction={restriction} />)
    //     const textField = calendar.find(TextFieldMasked)

    //     expect(textField.props().error).toBeFalsy()

    //     act(() => {
    //         textField.props().onChange(null, { masked: {
    //             isComplete: true,
    //             date: addYears(date, 2)
    //         } })
    //     })

    //     calendar.update()
    //     expect(calendar.find(TextFieldMasked).props().error).toBeTruthy()
    // })
})
