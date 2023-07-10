/* eslint-disable  max-lines */

export const exchangeRates = {
    BUY_REMOTE: 'BUY_REMOTE',
    SALE_REMOTE: 'SALE_REMOTE',
    BUY_REMOTE_CARD: 'BUY_REMOTE_CARD',
    SALE_REMOTE_CARD: 'SALE_REMOTE_CARD'
}

export const metalCodes = {
    AUR: 'AUR',
    ARG: 'ARG',
    PTR: 'PTR',
    PDR: 'PDR'
}

export const METAL_GRADUATION_AMOUNT = 1

export const rates = [
    {
        trend: 'UP',
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 64.48,
            code: 'RUB'
        },
        to: {
            code: 'USD'
        },
        amountUpper: 699.99
    },
    {
        trend: 'DOWN',
        amountBottom: 700,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 64.36,
            code: 'RUB'
        },
        to: {
            code: 'USD'
        },
        amountUpper: 1999.99
    },
    {
        amountBottom: 2000,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 64.16,
            code: 'RUB'
        },
        to: {
            code: 'USD'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'DOWN',
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'USD'
        },
        to: {
            amount: 66.45,
            code: 'RUB'
        },
        amountUpper: 699.99
    },
    {
        amountBottom: 700,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'USD'
        },
        to: {
            amount: 66.58,
            code: 'RUB'
        },
        amountUpper: 1999.99
    },
    {
        amountBottom: 2000,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'USD'
        },
        to: {
            amount: 66.98,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'UP',
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE_CARD',
        from: {
            amount: 64.72,
            code: 'RUB'
        },
        to: {
            code: 'USD'
        },
        amountUpper: 999.99
    },
    {
        trend: 'UP',
        amountBottom: 1000,
        currencyRateType: 'BUY_REMOTE_CARD',
        from: {
            amount: 64.14,
            code: 'RUB'
        },
        to: {
            code: 'USD'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'DOWN',
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE_CARD',
        from: {
            code: 'USD'
        },
        to: {
            amount: 67.84,
            code: 'RUB'
        },
        amountUpper: 999.99
    },
    {
        trend: 'DOWN',
        amountBottom: 1000,
        currencyRateType: 'SALE_REMOTE_CARD',
        from: {
            code: 'USD'
        },
        to: {
            amount: 66.8,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'DOWN',
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 71.01,
            code: 'RUB'
        },
        to: {
            code: 'EUR'
        },
        amountUpper: 699.99
    },
    {
        amountBottom: 700,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 70.54,
            code: 'RUB'
        },
        to: {
            code: 'EUR'
        },
        amountUpper: 1999.99
    },
    {
        amountBottom: 2000,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 70.38,
            code: 'RUB'
        },
        to: {
            code: 'EUR'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 2000,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'EUR'
        },
        to: {
            amount: 72.81,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'UP',
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'EUR'
        },
        to: {
            amount: 73.18,
            code: 'RUB'
        },
        amountUpper: 699.99
    },
    {
        amountBottom: 700,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'EUR'
        },
        to: {
            amount: 73.65,
            code: 'RUB'
        },
        amountUpper: 1999.99
    },
    {
        trend: 'UP',
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE_CARD',
        from: {
            amount: 71.2,
            code: 'RUB'
        },
        to: {
            code: 'EUR'
        },
        amountUpper: 999.99
    },
    {
        trend: 'DOWN',
        amountBottom: 1000,
        currencyRateType: 'BUY_REMOTE_CARD',
        from: {
            amount: 70.8,
            code: 'RUB'
        },
        to: {
            code: 'EUR'
        },
        amountUpper: 9.99999999999e9
    },
    {
        trend: 'DOWN',
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE_CARD',
        from: {
            code: 'EUR'
        },
        to: {
            amount: 74.69,
            code: 'RUB'
        },
        amountUpper: 999.99
    },
    {
        trend: 'DOWN',
        amountBottom: 1000,
        currencyRateType: 'SALE_REMOTE_CARD',
        from: {
            code: 'EUR'
        },
        to: {
            amount: 73.39,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 800,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1960,
            code: 'RUB'
        },
        to: {
            code: 'AUR'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 200,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1900,
            code: 'RUB'
        },
        to: {
            code: 'AUR'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1950,
            code: 'RUB'
        },
        to: {
            code: 'AUR'
        },
        amountUpper: 799.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1920,
            code: 'RUB'
        },
        to: {
            code: 'AUR'
        },
        amountUpper: 199.99
    },
    {
        amountBottom: 800,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'AUR'
        },
        to: {
            amount: 2135,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 200,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'AUR'
        },
        to: {
            amount: 2300,
            code: 'RUB'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'AUR'
        },
        to: {
            amount: 2145,
            code: 'RUB'
        },
        amountUpper: 799.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'AUR'
        },
        to: {
            amount: 2165,
            code: 'RUB'
        },
        amountUpper: 199.99
    },
    {
        amountBottom: 300,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 201.35,
            code: 'RUB'
        },
        to: {
            code: 'ARG'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 201.25,
            code: 'RUB'
        },
        to: {
            code: 'ARG'
        },
        amountUpper: 299.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 201.45,
            code: 'RUB'
        },
        to: {
            code: 'ARG'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 300,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'ARG'
        },
        to: {
            amount: 203.65,
            code: 'RUB'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'ARG'
        },
        to: {
            amount: 203.75,
            code: 'RUB'
        },
        amountUpper: 299.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'ARG'
        },
        to: {
            amount: 203.55,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 3282,
            code: 'RUB'
        },
        to: {
            code: 'PTR'
        },
        amountUpper: 449.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'PTR'
        },
        to: {
            amount: 3418,
            code: 'RUB'
        },
        amountUpper: 449.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 3100,
            code: 'RUB'
        },
        to: {
            code: 'PTR'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 500,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'PTR'
        },
        to: {
            amount: 3578,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1881,
            code: 'RUB'
        },
        to: {
            code: 'PDR'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'PDR'
        },
        to: {
            amount: 2115,
            code: 'RUB'
        },
        amountUpper: 499.99
    },
    {
        amountBottom: 500,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 1915,
            code: 'RUB'
        },
        to: {
            code: 'PDR'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 500,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 'PDR'
        },
        to: {
            amount: 2300,
            code: 'RUB'
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 7.483,
            code: 643
        },
        to: {
            code: 344
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 344
        },
        to: {
            amount: 8.795,
            code: 643
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'BUY_REMOTE',
        from: {
            amount: 30.7,
            code: 643
        },
        to: {
            code: 702
        },
        amountUpper: 9.99999999999e9
    },
    {
        amountBottom: 0,
        currencyRateType: 'SALE_REMOTE',
        from: {
            code: 702
        },
        to: {
            amount: 36.3,
            code: 643
        },
        amountUpper: 9.99999999999e9
    }
]
