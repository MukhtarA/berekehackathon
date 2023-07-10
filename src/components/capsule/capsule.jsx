import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { isAfter, parseISO } from 'date-fns'

import { formatDate } from '../../utils'
import { CapsuleStyled, IconStyled, DateStyled, MonthStyled, DayStyled } from './style'

const Capsule = ({ date, paymentInfo }) => {
    const { id, date: dateParam } = useParams()
    const { push } = useHistory()

    let isSelected = date === dateParam
    let iconName = 'icon:core/common/ic_36_checkmark'
    let status = 'green'
    const nextPayment = isAfter(parseISO(date), new Date())

    if (nextPayment) {
        iconName = 'icon:core/common/ic_36_moon_stars'
        status = 'gray'
    }

    if (paymentInfo) {
        if (date !== paymentInfo.lastPayDt) {
            iconName = 'icon:core/common/ic_36_sun'
            status = paymentInfo.isPlanFull ? 'green' : 'orange'

            if (paymentInfo.isPrsLoan) {
                iconName = 'icon:core/common/ic_36_exclamation'
                status = 'red'
            }
        } else {
            status = 'green'
        }

        if (!dateParam) {
            isSelected = true
        }
    }

    if (!isSelected) {
        status = null
    }

    const handleOnClick = useCallback(() => {
        push(`/loans/${id}/schedule/${date}`)
    }, [date, id, push])

    return (
        <CapsuleStyled status={status} onClick={handleOnClick}>
            <IconStyled name={iconName} status={status} />
            <DateStyled>
                <MonthStyled>{formatDate(date, 'MMM')}</MonthStyled>
                <DayStyled fontWeight="semibold">{formatDate(date, 'd')}</DayStyled>
            </DateStyled>
        </CapsuleStyled>
    )
}

Capsule.propTypes = {
    date: PropTypes.string.isRequired,
    paymentInfo: PropTypes.object
}

Capsule.defaultProps = {
    paymentInfo: null
}

export default Capsule
