// comment: for demo purpose
/* eslint-disable valid-jsdoc */
function applyStyles (styles, props) {
    // comment: more visual
    return typeof styles === 'function'
        ? styles(props)
        : Array.isArray(styles)
            ? styles.map((s) => applyStyles(s, props))
            : styles
}

/**
 * Makes it easier to create an emotion component which
 * accepts props to enable/disable certain styles.
 *
 * accepts an object where the key is a prop and the value
 * is the styles that should be applied if that prop is
 * passed. Returns a function which you pass to a
 * emotionComponentFactory.
 *
 * @param {Object} styles The prop to styles object
 * @return {Function} the dynamic styles function
 * @example
 *
 * export const Text = styled(Box)(
    propStyles({
        nowrap: {
            whiteSpace: 'nowrap'
        },
        ellipsis: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        align: css`
            text-align: ${(p) => p.align};
        `,
        bold: {
            fontWeight: 'bold'
        },
        uppercase: {
            textTransform: 'uppercase'
        }
    })
)
 */
export function propStyles (styles) {
    return function dynamicStyles (props) {
        return Object.keys(props).map((key) => {
            if (styles[key] && props[key]) {
                return applyStyles(styles[key], props)
            }
            return null
        })
    }
}

/**
 * Makes it easier to create an emotion component
 * which accepts enums for certain variants of styles
 *
 * Accepts an object where the key is a variant name
 * (the prop consumers will use) and the value is an
 * object where those keys are the possible values for
 * the variant prop, and the value is the styles to be
 * applied.
 *
 * @example
 const Text = styled(Box)(
    background: '#fff';
    variantStyles({
        variant: {
            headline: {
                fontSize: '32px',
                lineHeight: '1.125'
            },
            title: {
                fontSize: '22px',
                lineHeight: '1.1818'
            },
            body: {
                fontSize: '16px',
                lineHeight: '1.25'
            },

            caption: {
                fontSize: '14px',
                lineHeight: '1.2857'
            }
        }
    })
)
 */
export function variantStyles (styles) {
    return function dynamicStyles (props) {
        return Object.entries(props).map(([key, value]) => {
            if (styles[key]) {
                return applyStyles(styles[key][value], props)
            }
            return null
        })
    }
}
