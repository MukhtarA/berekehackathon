import { useState } from 'react'

const PAGE_2 = 2
const PAGE_4 = 4
const PAGE_5 = 5

export const getMediaListeners = (media, cb) => {
    if (media.addEventListener) {
        return {
            addMediaListener: () => media.addEventListener('change', cb),
            removeMediaListener: () => media.removeEventListener('change', cb)
        }
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
    // backwards compatibility IE, Opera
    return {
        addMediaListener: () => media.addListener(cb),
        removeMediaListener: () => media.removeListener(cb)
    }
}

export const usePagination = ({
    count = 1,
    defaultPage = 1,
    page,
    onChange: handleChange,
    mobile = false
}) => {
    const [pageState, setPageState] = useState(page || defaultPage)

    const handleClick = (event, value) => {
        setPageState(value)
        if (handleChange) {
            handleChange(value)
        }
    }

    const start = Math.max(
        Math.min(
            // Если по центру нужно с -1 элемента начать
            pageState > PAGE_5 ? pageState - 1 : 1,
            // Первая цифра за троеточием в конце
            count - PAGE_4,
        ),
        // Первая цифра перед троеточием в начале
        PAGE_2,
        // Если в конце списка, то значение count - 1
        pageState > count - PAGE_5 ? count - PAGE_4 : 1,
    )

    const end = Math.min(
        Math.max(
            // Если по центру, то +1 элемент рисуем
            pageState > PAGE_5 ? pageState + 1 : 1,
            // Если в конце списка, то значение count - 1
            pageState > count - PAGE_5 ? count - 1 : 1,
            // Последняя цифра за троеточием в начале
            PAGE_5,
        ),
        // Последняя цифра после троеточия в конце
        count - 1,
    )

    // Создаем массив с числами от start до end
    // https://dev.to/namirsab/comment/2050
    const range = () => {
        const length = end - start + 1
        return length >= 0 && Array.from({ length }, (_, i) => start + i)
    }

    const mobileRange = () => {
        const length = count < 3 ? count : 3
        const page = Math.max(
            count === pageState ? pageState - 2 : pageState - 1,
            1,
        )
        return length >= 0 && Array.from({ length }, (_, i) => page + i)
    }

    const rangeArr = range()
    const mobileRangeArr = mobileRange()

    const itemList = mobile ? [
        count > 1 ? 'first' : [],
        // Кнопка назад
        count > 1 ? 'previous' : [],
        ...mobileRangeArr,
        count > 1 ? 'next' : [],
    ] :
        [
        // Кнопка назад
            count > 1 ? 'previous' : [],
            // 1 страница
            1,
            // Вставляем многоточие, если нужная страница не первые пять
            ...(start >= PAGE_5 ? ['doublePrevious'] : []),
            // Вставляем середину страницы которую должно быть видно
            ...(rangeArr || []),
            // Вставляем многоточие, если нужная страница не последние пять
            ...(end <= count - PAGE_4 ? ['doubleNext'] : []),
            // Последняя страница
            count > 1 ? count : [],
            count > 1 ? 'next' : [],
        ]

    const buttonPage = (type) => {
        switch (type) {
            case 'doublePrevious':
                return pageState - 3
            case 'previous':
                return pageState - 1
            case 'next':
                return pageState + 1
            case 'doubleNext':
                return pageState + 3
            case 'first':
                return 1
            default:
                return null
        }
    }

    const items = itemList.map((item) => typeof item === 'number'
        ? {
            onClick: (event) => {
                handleClick(event, item)
            },
            type: 'page',
            pageItem: item,
            selected: item === pageState,
            'aria-current': item === pageState ? 'true' : 'false',
        }
        : {
            onClick: (event) => {
                handleClick(event, buttonPage(item))
            },
            type: item,
            pageItem: buttonPage(item),
            selected: false,
            disabled:
            (item.indexOf('previous') === -1 || item.indexOf('next') === -1 || item.indexOf('first') === -1) &&
              (item === 'next' ? pageState >= count : pageState <= 1),
        })


    return { items }
}
