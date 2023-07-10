export const handleStatusColorScheme = (status) => {
    let colorScheme

    switch (status) {
        case 'POSTED':
            colorScheme = 'successPrimary'
            break
        case 'BLOCKED':
            colorScheme = 'waiting'
            break
        default:
            colorScheme = 'warning'
    }

    return colorScheme
}

export const handleCashbackTitle = (status) => {
    let title

    switch (status) {
        case 'POSTED':
            title = '+ '
            break
        case 'REVERSED':
            title = '- '
            break
        default:
            title = ''
    }

    return title
}
