import IMask from 'imask'

import { makeMoneyMask } from './make-money-mask'

const defaultMoneyMask = makeMoneyMask({})

export const formatNumber = (number, mask = defaultMoneyMask) =>
    IMask.pipe(number.toString(), mask)
