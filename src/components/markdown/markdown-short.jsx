import React from 'react'
import PropTypes from 'prop-types'

import { markdownShort } from './utils'
import { ShortStyled } from './markdown.style'

export const MarkdownShort = ({
    content,
    size = 'md',
    className,
    colorScheme,
    verticalPadding,
    verticalMargin,
    horizontalMargin
}) => (
    <ShortStyled
        size={size}
        className={className}
        colorScheme={colorScheme}
        verticalPadding={verticalPadding}
        verticalMargin={verticalMargin}
        horizontalMargin={horizontalMargin}
        // comment: Markdown - один из немногих случаев, когда позволяется делать danger
        dangerouslySetInnerHTML={{
            __html: markdownShort.render(content)
        }}
    />
)

MarkdownShort.propTypes = {
    content: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    /* Color from Theme*/
    colorScheme: PropTypes.string,
    verticalPadding: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    verticalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
    horizontalMargin: PropTypes.oneOf(['open', 'inner', 'micro', 'nano', 'zero']),
}
