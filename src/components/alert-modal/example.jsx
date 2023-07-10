/* eslint-disable no-console */
/* eslint-disable @sbol/common/no-cyrillic-outside-cms */
import React, { useCallback, useState } from 'react'

import AlertModal from '.'

const Example = () => {
    const [alertOpen, setAlertOpen] = useState(true)

    const handleOk = useCallback(() => {
        console.log('Ok is work!')
    }, [])

    const handleClose = useCallback(() => {
        setAlertOpen(false)
    }, [])

    const alertButtons = [
        {
            text: 'Отмена',
            role: 'cancel',
            colorScheme: 'warning'
        },
        {
            text: 'ОК',
            role: 'ok',
            handler: handleOk
        }
    ]

    return (
        <AlertModal
            title="Извините!"
            message=" К сожалению возникли неполадки с оплатой. Пожалуйста, повторите попытку
            позже."
            buttons={alertButtons}
            open={alertOpen}
            onClose={handleClose}
        />
        //     <AlertModal
        //     title="Заголовок!"
        //     message="Вариант с одной кнопкой"
        //     buttons={['OK']}
        //     open={alertOpen}
        //     onClose={handleClose}
        // />
    )
}

export default Example
