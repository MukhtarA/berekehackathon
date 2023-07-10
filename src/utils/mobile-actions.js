/* eslint-disable babel/camelcase */
import { useState, useEffect } from 'react'
import { showPdfOnWindow } from '../components/screen-layout/mobile-fallbacks/helpers'

import { mobileObserver } from '../components/screen-layout/mobile-fallbacks'

export const MobileActions = {
    /**
     * @description Получение конфигураций (Токен авторизации, BiZone AntiFraud, цветовая схема приложения, локализация)
     * @return {String} Возвращает JSON объект с полями
     */
    getConfigs() {
        return window.Mobile?.getConfigs()
    },
    /**
     * @description Обновить токен авторизации
     * @return {String} Обновляет токен. Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onTokenResult(token:String) - возвращает токен в формате "Bearer a213fj9213h..."
     */
    refreshToken() {
        if (window.webkit) {
            window.webkit.messageHandlers.refreshToken.postMessage({})
        } else {
            window.Mobile?.refreshToken()
        }
    },
    /**
     * @description Завершить работу веб-приложения
     * @return {undefined} Возврат на предыдущий нативный экран
     */
    exit() {
        if (!window.Mobile) {
            window.location.href = '/'

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.exit.postMessage({})
        } else {
            window.Mobile?.exit()
        }
    },
    /**
     * @description Запуск обработки DeepLink приложением
     * @param {String} deeplink Ссылка
     * @return {undefined} Выполняет переданный deeplink в приложении
     */
    handleDeeplink(deeplink) {
        if (!window.Mobile) {
            window.open(deeplink, '_blank')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.handleDeeplink.postMessage({ deeplink })
        } else {
            window.Mobile?.handleDeeplink(deeplink)
        }
    },
    /**
     * @description Показ sms диалога
     * @return {undefined} На экране отображается диалог ввода смс. Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onSmsDialogResendClicked() - "Пользователь нажал повторно отправить смс"
     * onSmsDialogResult(smsCode:String) - "Пользователь ввел смс код"
     */
    showSmsDialog() {
        if (!window.Mobile) {
            mobileObserver.broadcast('showSmsDialog')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.showSmsDialog.postMessage({})
        } else {
            window.Mobile?.showSmsDialog()
        }
    },
    /**
     * @description Скрытие sms диалога (после получения sms)
     * @return {undefined} Диалог ввода смс скрывается.
     */
    hideSmsDialog() {
        if (!window.Mobile) {
            mobileObserver.broadcast('hideSmsDialog')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.hideSmsDialog.postMessage({})
        } else {
            window.Mobile?.hideSmsDialog()
        }
    },
    /**
     * @description Показ страницы сканирования QR кода
     * @return {undefined} Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onQrScannerResult(qrValue:String) - "Результат сканирования смс"
     */
    showQrScanner() {
        if (!window.Mobile) {
            mobileObserver.broadcast('unavailableOnPC')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.showQrScanner.postMessage({})
        } else {
            window.Mobile?.showQrScanner()
        }
    },
    /**
     * @description Показ страницы pdf
     * @param {String} url ссылка пдф файла
     * @param {String} title Название документа
     * @param {Int} documentId Идентификатор документа
     * @param {Boolean} isConfirmButtonVisible Показ кнопки согласия
     * @param {String} buttonTitle Текст кнопки
     * @return {undefined} Открывает ссылку в формате pdf в отдельном окне. Аргументы url и title обязательны, остальные опциональны.
     * Обратный вызов нажатия кнопки подтверждения происходит с помощью вызова приложением следующего JS метода:
     * onPdfConfirmResult(documentId:Int)
     */
    showPdf(url, title, documentId = null, isConfirmButtonVisible = null, buttonTitle = null) {
        if (!window.Mobile) {
            showPdfOnWindow(url, title, documentId)

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.showPdf.postMessage({
                url,
                title,
                documentId,
                isConfirmButtonVisible,
                buttonTitle
            })
        } else {
            window.Mobile?.showPdf(url, title, documentId, isConfirmButtonVisible, buttonTitle)
        }
    },
    /**
     * @description Запросить местоположение пользователя
     * @return {undefined} Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onLocationResultDenied() - пользователь запретил доступ к геопозиции
     * onLocationResult(value:String) - местоположение пользователя, где значение value в виде "lat=20.5;long=21.632"
     */
    requestLocation() {
        if (!window.Mobile && !navigator.geolocation) {
            window.onLocationResultDenied()

            return
        }

        if (!window.Mobile) {
            navigator.geolocation?.getCurrentPosition(({ coords }) => {
                window.onLocationResult(`lat=${coords.latitude};long=${coords.longitude}`)
            }, window.onLocationResultDenied)

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.requestLocation.postMessage(true)
        } else {
            window.Mobile?.requestLocation()
        }
    },
    /**
     * @description Сохранить данные в key-value хранилище
     * @param {String} key Название ключа
     * @param {String} value Содержимое ключа
     * @return {undefined} Сохраняет данные в локальное хранилище (shared prefrences в Android) приложения в scope WebApp
     */
    setData(key, value) {
        if (!window.Mobile) {
            localStorage.setItem(key, value)

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.setData.postMessage({ key, value })
        } else {
            window.Mobile?.setData(key, value)
        }
    },
    /**
     * @description Получить данные из локального key-value хранилища по ключу
     * @param {String} key Название ключа
     * @return {String} Запрашивает данные из локального хранилища по ключу если они имеются. Если значение по ключу не найдено возвращает null.
     * Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onDataResult(key: String, value: String) - возвращает значение по ключу
     */
    getData(key) {
        if (!window.Mobile) {
            window.onDataResult(key, localStorage.getItem(key))

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.getData.postMessage({ key })
        } else {
            window.Mobile?.getData(key)
        }
    },
    /**
     * @description Вызов нативного платформенного модуля видеоидентификации
     * @param {String} correlationId Уникальный ключ для откладки
     * @param {String} processId Статичный идентификатор сервиса
     * @return {String} Инициализирует нативный процесс видеоидентификации.
     * Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onBioIdentifierResult(correlationId: String, requestID: String) - при успешном прохождении видеоидентификации
     * onBioIdentifierDenied(correlationId: String, denyType: String) - вызывает при закрытии нативного окна бех прохождения, детали: https://confluence.berekebank.kz/pages/viewpage.action?pageId=146742155
     */
    openBioIdentifier(correlationId, processId) {
        if (!window.Mobile) {
            mobileObserver.broadcast('unavailableOnPC')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.openBioIdentifier.postMessage({
                correlationId,
                processId
            })
        } else {
            window.Mobile?.openBioIdentifier(correlationId, processId)
        }
    },
    /**
     * @description Вызов нативного платформенного модуля ЭЦП + Биометрия
     * @param {String} correlationId Уникальный ключ для откладки
     * @param {String} processId Статичный идентификатор сервиса
     * @param {String} docsForSign Статичный идентификатор сервиса
     * @return {String} Инициализирует нативный процесс подписания документов.
     * Обратный вызов осуществляется посредством вызова приложением следующих JS методов:
     * onSignerBioResult(correlationId: String) - при успешном подписании документов
     * onSignerBioDenied(correlationId: String, denyType: String) - вызывает при закрытии нативного окна бех прохождения, детали: https://confluence.berekebank.kz/pages/viewpage.action?pageId=145817675
     */
    openSignerBio(correlationId, processId, docsForSign) {
        if (!window.Mobile) {
            mobileObserver.broadcast('unavailableOnPC')

            return
        }

        if (window.webkit) {
            window.webkit.messageHandlers.openSignerBio.postMessage({
                correlationId,
                processId,
                docsForSign
            })
        } else {
            window.Mobile?.openSignerBio(correlationId, processId, docsForSign)
        }
    }
}

export const useMobileConfigs = () => {
    const [mode, setMode] = useState('LIGHT')

    useEffect(() => {
        const mobileConfigs = MobileActions.getConfigs()

        if (mobileConfigs) {
            const { color_mode, authorization, bizone_antifraud, language, data } = JSON.parse(
                mobileConfigs
            )
            localStorage.setItem('access_token', authorization)
            localStorage.setItem('antifraud', bizone_antifraud)
            localStorage.setItem('language', language.toLowerCase())
            localStorage.setItem('mobile_data', data)
            setMode(color_mode.toUpperCase())
        }
    }, [])

    return { mode }
}
