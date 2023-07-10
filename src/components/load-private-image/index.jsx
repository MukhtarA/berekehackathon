import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import { getAccessToken } from '../auth/helpers'

export const LoadPrivateImage = ({
    path,
    defaultImg,
    initialImg,
    alt,
    render,
    onLoad,
    ...props
}) => {
    const [img, setImg] = useState(initialImg)

    useEffect(() => {
        async function fetchImage() {
            const res = await axios(path, {
                responseType: 'arraybuffer',
                headers: {
                    Authorization: `Bearer ${getAccessToken()}`
                }
            })

            if (res?.data) {
                const blob = new Blob([res.data])
                const data = URL.createObjectURL(blob)
                setImg(data)

                if (onLoad) {
                    onLoad({ data })
                }
            }
        }

        if (path && !img) {
            fetchImage()
        }

        return () => {
            if (!onLoad) {
                URL.revokeObjectURL(img)
            }
        }
    }, [path, img, onLoad])

    if (render) {
        return render(img)
    }

    return <img src={img || defaultImg} alt={alt} {...props} />
}

LoadPrivateImage.propTypes = {
    path: PropTypes.string.isRequired,
    defaultImg: PropTypes.node,
    initialImg: PropTypes.node,
    alt: PropTypes.string,
    render: PropTypes.func,
    onLoad: PropTypes.func
}

LoadPrivateImage.defaultProps = {
    defaultImg: null,
    initialImg: null,
    alt: '',
    render: null,
    onLoad: null
}
