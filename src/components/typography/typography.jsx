import PropTypes from 'prop-types'

import { TypographyStyled as Typography } from './typography.style'

Typography.propTypes = {
    children: PropTypes.node.isRequired,
    fontWeight: PropTypes.oneOf(['semibold', 'medium', 'regular']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalPadding: PropTypes.oneOf([
        'open',
        'inner',
        'micro',
        'nano',
        'zero'
    ]),
    /* Color from Theme*/
    colorScheme: PropTypes.string
}

export { Typography }
