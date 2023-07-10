import React, { useState, useCallback, useContext, Children, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Formik, useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { Body2, Caption } from '@sbol/design-system/core/typography'

import { FormCard } from '../cards'
import {
    ViewOnlyStyled,
    FooterStyled,
    SubmitButtonStyled,
    CancelButtonStyled,
    EditLinkStyled,
    ViewOnlyColumn
} from './style'

export const WizardContext = React.createContext({
    hasFooter: false,
    setHasFooter: () => null
})

const ValidateForm = () => {
    const { validateForm } = useFormikContext()

    useEffect(() => {
        validateForm()
    }, [validateForm])

    return null
}

const ViewOnlyStep = ({ viewData }) => {
    return (
        <ViewOnlyStyled>
            {viewData.map((field) => (
                <ViewOnlyColumn key={field.key}>
                    <Caption indent="zero" colorScheme="secondary">
                        {field.caption}
                    </Caption>
                    <Body2 verticalMargin="zero">{field.body}</Body2>
                </ViewOnlyColumn>
            ))}
        </ViewOnlyStyled>
    )
}

export const Wizard = ({ children, initialValues, onSubmit, defaultStepNumber, noEdit }) => {
    const { t } = useTranslation('shared')
    const [hasFooter, setHasFooter] = useState(false)
    const [stepNumber, setStepNumber] = useState(defaultStepNumber)
    const steps = Children.toArray(children)
    const [snapshot, setSnapshot] = useState(initialValues)

    const step = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1

    const next = useCallback(
        (values) => {
            setSnapshot(values)
            setStepNumber(Math.min(stepNumber + 1, totalSteps - 1))
        },
        [stepNumber, totalSteps]
    )

    const edit = useCallback(
        (index) => () => {
            setStepNumber(index)
            setHasFooter(false)
        },
        []
    )

    const handleSubmit = useCallback(
        async (values, bag) => {
            if (isLastStep) {
                return onSubmit(values, bag)
            }

            if (step.props.onSubmit) {
                return step.props.onSubmit(values, bag, next)
            }

            bag.setTouched({})

            return next(values)
        },
        [isLastStep, next, onSubmit, step.props]
    )

    return (
        <WizardContext.Provider value={{ hasFooter, setHasFooter }}>
            <Formik
                initialValues={snapshot}
                onSubmit={handleSubmit}
                validationSchema={step.props.validationSchema}
            >
                {(formik) => {
                    // console.log('formik', formik)
                    return (
                        <Form>
                            {/* eslint-disable-next-line complexity */}
                            {steps.map((child, index) => {
                                const {
                                    title,
                                    isLoading,
                                    isValid = false,
                                    isStrictlyValid = false,
                                    finishedView,
                                    alwaysShow = false,
                                    children: stepChildren
                                } = child.props
                                const stepIsFinished = index < stepNumber
                                const stepIsValid = isStrictlyValid
                                    ? isValid
                                    : isValid || (formik.dirty && formik.isValid)
                                const stepIsUpcoming = index > stepNumber

                                const isSuitableToEdit = () => {
                                    if (noEdit) {
                                        return false
                                    } else if (stepIsFinished) {
                                        return true
                                    }

                                    return false
                                }

                                return (
                                    <FormCard
                                        key={title}
                                        upComing={stepIsUpcoming}
                                        isFinished={stepIsFinished}
                                        title={title}
                                        alwaysShow={alwaysShow}
                                    >
                                        {stepIsFinished && !finishedView && (
                                            <ViewOnlyStyled>
                                                {Children.map(
                                                    stepChildren,
                                                    (field) =>
                                                        field &&
                                                        React.cloneElement(field, {
                                                            viewOnly: true
                                                        })
                                                )}
                                            </ViewOnlyStyled>
                                        )}
                                        {stepIsFinished && finishedView && (
                                            <ViewOnlyStep viewData={finishedView} />
                                        )}
                                        {!stepIsFinished &&
                                            React.cloneElement(child, { ...formik })}
                                        {!stepIsFinished && <ValidateForm />}
                                        {!hasFooter && !stepIsFinished && (
                                            <FooterStyled>
                                                <SubmitButtonStyled
                                                    disabled={!stepIsValid}
                                                    loading={isLoading}
                                                    title={t(
                                                        isLastStep
                                                            ? 'navigation.finish'
                                                            : 'navigation.next'
                                                    )}
                                                    fullWidth
                                                    type="submit"
                                                />
                                            </FooterStyled>
                                        )}
                                        {isSuitableToEdit() && (
                                            <EditLinkStyled
                                                title={t('navigation.edit')}
                                                onClick={edit(index)}
                                                iconName="icon:core/common/ic_24_pencil_stroke"
                                                colorScheme="success"
                                                fontWeight="semibold"
                                            />
                                        )}
                                    </FormCard>
                                )
                            })}
                        </Form>
                    )
                }}
            </Formik>
        </WizardContext.Provider>
    )
}

ViewOnlyStep.propTypes = {
    viewData: PropTypes.arrayOf(PropTypes.object).isRequired
}

Wizard.propTypes = {
    children: PropTypes.node.isRequired,
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    defaultStepNumber: PropTypes.number,
    noEdit: PropTypes.bool
}

Wizard.defaultProps = {
    onSubmit: void 0,
    defaultStepNumber: 0,
    noEdit: false
}

const FooterSection = ({ children, title, isLoading, disabled, onCancel, viewOnly }) => {
    const { setHasFooter } = useContext(WizardContext)
    const { t } = useTranslation('shared')
    const { goBack } = useHistory()

    useEffect(() => setHasFooter(true), [setHasFooter])

    if (viewOnly) {
        return null
    }

    if (!children) {
        return (
            <FooterStyled>
                <SubmitButtonStyled
                    fullWidth
                    loading={isLoading}
                    disabled={disabled}
                    title={title}
                    type="submit"
                />
                {onCancel && (
                    <CancelButtonStyled
                        fullWidth
                        title={t('navigation.cancel')}
                        type="button"
                        onClick={onCancel === true ? goBack : onCancel}
                    />
                )}
            </FooterStyled>
        )
    }

    return <FooterStyled>{children}</FooterStyled>
}

FooterSection.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    onCancel: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    viewOnly: PropTypes.bool
}

FooterSection.defaultProps = {
    children: null,
    title: '',
    isLoading: false,
    disabled: false,
    onCancel: false,
    viewOnly: false
}

export const WizardStep = ({ children, ...props }) =>
    typeof children === 'function' ? children({ ...props }) : children

WizardStep.Footer = FooterSection
