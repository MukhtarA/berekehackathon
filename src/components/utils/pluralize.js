// comment: алгоритм работает с числами в стиле 4 кита, 4 китов, 1 кит, 11 китов, 19 китов, 21 кит, 22 кита и тд
/* eslint-disable no-magic-numbers */
// [1]: (+|-)(10 * n + 1) && n !== 1, n >= 0 ... котенок
// [2]: (+|-)(10 * n + [2..4]) && n !== 10 * m + 1, n >= 0, m >= 0 ... котенка
// [3]: ![1] && ![2] ... котенков

import _ from 'lodash'

export function pluralize (vars, quantity) {
    const [many, one, some] = vars
    if ((!many || !one || !some) && process.env.NODE_ENV !== 'production') {
        // comment: защита от некорректного использования принципов pluralize
        console.warn(`Component Usage Warning: pluralize should has 3 options: [many = ${many}, one = ${one}, some = ${some}]`)

    }

    const roundQuantity = _.floor(quantity)

    if (roundQuantity % 10 === 1 && roundQuantity % 100 !== 11) {
        return one
    } else if (roundQuantity % 10 >= 2 && roundQuantity % 10 <= 4 && (roundQuantity % 100 < 12 || roundQuantity % 100 > 14)) {
        return some
    }

    return many
}
