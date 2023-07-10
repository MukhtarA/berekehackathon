import { useEffect, useState, useRef } from 'react'
import _set from 'lodash.set'
import _get from 'lodash.get'
import { debounce as _debounce } from 'lodash'

function mapValidationErrors(yupError) {
    const errors = {}
    yupError.inner.forEach((valErr, index) => {
        errors[valErr.path] = yupError.errors[index]
    })

    return errors
}

const displayTouched = (errors, touched, touchedAll) => {
    if (touchedAll) {
        return errors
    }

    return Object.keys(touched).reduce((acc, key) => {
        if (errors[key]) {
            return { ...acc, [key]: errors[key] }
        }

        return acc
    }, {})
}

export function useYupValidation(schema) {
    const [errors, setErrors] = useState({})

    async function validateField(data, sub) {
        try {
            schema.validateAt(sub, data)

            setErrors((prev) => ({ ...prev, [sub]: null }))

            return true
        } catch (err) {
            setErrors((prev) => ({ ...prev, [sub]: err.message }))
        }

        return false
    }

    async function validate(data) {
        try {
            await schema.validate(data, { abortEarly: false })
            setErrors({})

            return true
        } catch (err) {
            setErrors(mapValidationErrors(err))

            return false
        }
    }

    return [errors, validate, validateField]
}

export const useForm = (initialValues = {}, schema) => {
    const [values, setValues] = useState(initialValues)
    const [errors, validate] = useYupValidation(schema)
    const [touched, setTouched] = useState({})
    const [touchedAll, setTouchedAll] = useState(false)
    const [isValidForm, setValidForm] = useState(false)

    const handleChange = (name) => async (value) => {
        setValues((prev) => {
            const newState = { ...prev }
            _set(newState, name, value)

            return newState
        })
    }

    const handleSubmit = (onSubmit) => async (e) => {
        e.preventDefault()
        setTouchedAll(true)

        if (schema) {
            const valid = await validate(values)

            return onSubmit(values, valid)
        }

        return null
    }

    const handleBlur = (name) => () => {
        if (!touched[name]) {
            setTouched((prev) => ({ ...prev, [name]: true }))
        }
    }

    const runValidate = useRef(
        _debounce(async (prevValid, newValues) => {
            const valid = await validate(newValues)

            if (valid !== prevValid) {
                setValidForm(valid)
            }
        }, 400)
    )

    const register = (name) => ({
        name,
        onChange: handleChange(name),
        onBlur: handleBlur(name),
        value: _get(values, name)
    })

    useEffect(() => {
        if (schema) {
            runValidate.current(isValidForm, values)
        }
    }, [values, isValidForm, schema])

    return {
        register,
        handleSubmit,
        errors: displayTouched(errors, touched, touchedAll),
        touched,
        touchedAll,
        invalid: !isValidForm
    }
}
