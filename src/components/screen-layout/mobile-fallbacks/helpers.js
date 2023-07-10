import api from '../../../api'

const downloadPdf = (url) => {
    return api.get(url, { responseType: 'blob' })
}

const openWindow = (url, docId) => {
    const popup = window.open(url, '_blank')
    const timer = setInterval(() => {
        if (popup.closed) {
            clearInterval(timer)
            window.onPdfConfirmResult(docId)
        }
    }, 1000)
}

const regexIsInternalUrl = /(berekebank\.kz|sberbank\.kz|haos)/

export const showPdfOnWindow = async (url, title, documentId) => {
    if (regexIsInternalUrl.test(url)) {
        const file = await downloadPdf(`${url}`)

        if (navigator.userAgent.search(/iphone/i) >= 0) {
            const a = document.createElement('a')
            document.body.appendChild(a)
            a.style = 'display: none'
            URL.createObjectURL(file.data)
            a.href = URL.createObjectURL(file.data)
            a.download = 'offer'
            a.click()
            URL.revokeObjectURL(file.data)
            a.remove()
        } else {
            openWindow(URL.createObjectURL(file.data), documentId)
        }

        return
    }

    openWindow(url)
}
