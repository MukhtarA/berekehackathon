import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { Trans, useTranslation } from 'react-i18next'

import {
    FileUploadStyled,
    FileStyled,
    IconStyled,
    LinkStyled,
    FileListStyled,
    NoFileStyled,
    DeleteStyled
} from './style'

import uploadSvg from './assets/upload.svg'

export const FileUpload = ({ value, name, dragIKey, multiple, onChange, error, ...props }) => {
    const { t } = useTranslation(['common', 'shared'])
    const [files, setFiles] = useState(Array.isArray(value) ? value : [])

    const concatFiles = useCallback(
        (items) => {
            if (multiple) {
                setFiles((fileList) => {
                    return items.reduce((list, item) => {
                        const isDuplicate = list.find((x) => x.name === item.name)

                        if (!isDuplicate) {
                            return list.concat(item)
                        }

                        return list
                    }, fileList)
                })
            } else {
                setFiles(items)
            }
        },
        [multiple]
    )

    const addFiles = useCallback((items) => {
        setFiles(items)
    }, [])

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault()
            e.stopPropagation()

            concatFiles([...e.dataTransfer.files])
        },
        [concatFiles]
    )

    const handleDragOver = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleChange = useCallback(
        (e) => {
            addFiles([...e.target.files])
        },
        [addFiles]
    )

    const handleDel = useCallback(
        (filename) => (e) => {
            e.preventDefault()
            e.stopPropagation()
            setFiles((prev) => prev.filter((x) => x.name !== filename))
        },
        []
    )

    useEffect(() => {
        if (onChange) {
            onChange(multiple ? files : files[0])
        }
    }, [files, multiple]) // eslint-disable-line react-hooks/exhaustive-deps

    const list = (
        <FileListStyled>
            {files.map((item) => (
                <FileStyled key={item.name}>
                    <IconStyled
                        width="36"
                        height="36"
                        name="icon:core/common/ic36FilePdf"
                        colorScheme="success"
                    />
                    <div>
                        <p>{item.name}</p>
                        {props.status}
                    </div>
                    <DeleteStyled onClick={handleDel(item.name)}>
                        <IconStyled
                            width={24}
                            height={24}
                            name="icon:core/common/ic24TrashBin"
                            colorScheme="tertiary"
                        />
                    </DeleteStyled>
                </FileStyled>
            ))}
        </FileListStyled>
    )

    const noFiles = (
        <NoFileStyled>
            <img style={{ width: 25, height: 25 }} src={uploadSvg} />
            <Trans t={t} i18nKey={dragIKey}>
                <p colorScheme="tertiary" />
                <LinkStyled as="label" htmlFor="file-input-upload" colorScheme="brandPrimary" />
            </Trans>
        </NoFileStyled>
    )

    return (
        <>
            <input
                id="file-input-upload"
                name={name}
                type="file"
                hidden
                value={files.map((file) => file.filename)}
                onChange={handleChange}
                {...props}
            />
            <FileUploadStyled onDrop={handleDrop} onDragOver={handleDragOver}>
                {_isEmpty(files) ? noFiles : list}
            </FileUploadStyled>
        </>
    )
}

FileUpload.propTypes = {
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    dragIKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    multiple: PropTypes.bool,
    status: PropTypes.node,
    error: PropTypes.string,
    onChange: PropTypes.func
}

FileUpload.defaultProps = {
    name: '',
    value: null,
    multiple: false,
    status: null,
    error: '',
    onChange: () => {}
}
