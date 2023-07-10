import * as exports from '..'

import { interfaceCheck } from './interface-check'
import { exportCheck } from './export-check'
import { themeCheck } from './theme-check'

describe('Открытое API библиотеки', () => {
    it('все экспортируемые компоненты и функции должны быть объявлены', () => {
        exportCheck(exports)
    })

    it('все компоненты должны обладать корректным интерфейсом с зарегистрированными исключениями, если таковые есть', () => {
        interfaceCheck(exports)
    })

    it('ключи токенов в светлой и темной теме должны совпадать', () => {
        themeCheck()
    })
})
