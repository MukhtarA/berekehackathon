import styled from "@emotion/styled/macro"
import { css, keyframes } from '@emotion/react'

import { Typography } from '../../typography/typography'
import { dynamicIndent } from '../../styles/dynamic-styles'
import { errorColors } from '../utils.style'

import { radioSpringAnimation } from './radio-spring-animation.keyframe'

const checkedAnimationDuration = '1s'
const uncheckedAnimationDuration = '0.3s'

const sizeParametrs = {
    sm: {
        size: '16px',
        sizeCircle: '10px',
    },
    md: {
        size: '20px',
        sizeCircle: '10px',
    },
    lg: {
        size: '24px',
        sizeCircle: '14px',
    }
}

export const RadioTypograpyStyled = styled(Typography)(({ size }) => css`
    margin-left: ${dynamicIndent(size, 'nano')};
`)

const fadeOutAnimation = keyframes`
    0% { opacity: 1 }
    100% {
        transform: translateY(-20px);
        opacity: 0;
    }
`

const radioSelectionMarkerStyle = (size) => css`
    position: relative;
    width: ${sizeParametrs[size].sizeCircle};
    height: ${sizeParametrs[size].sizeCircle};
    border-radius: 7px;
    transition: 0.3s;
`

export const ButtonStyled = styled('div')(({ size }) => css`
    position: relative;
    display: flex;
    flex-shrink: 0;
    width: ${sizeParametrs[size].size};
    height: ${sizeParametrs[size].size};
    border-radius: 20px;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    transition: 0.3s;

    &::before {
        content: '';
        ${radioSelectionMarkerStyle(size)};

        animation: ${fadeOutAnimation} ${uncheckedAnimationDuration} linear;
    }
`)

export const InputStyled = styled.input(css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
`,
({ theme, error }) => {
    const radioColors = error ? errorColors(theme) : theme

    return css`
        & ~ ${ButtonStyled} {
            background: ${radioColors.checkboxBody};
            border: solid 1px ${radioColors.checkboxOffNormal};
        }
        
        & ~ ${RadioTypograpyStyled} {
            color: ${radioColors.checkboxOffTextNormal};
        }
            
        &:hover {
            & ~ ${ButtonStyled} {
                border-color: ${radioColors.checkboxOffHover};
            }
            
            & ~ ${RadioTypograpyStyled} {
                color: ${radioColors.checkboxOffTextHover};
            }
        }
        
        &:active {
            & ~ ${ButtonStyled} {
                border-color: ${radioColors.checkboxOffClick};
            }
            
            & ~ ${RadioTypograpyStyled} {
                color: ${radioColors.checkboxOffTextClick};
            }
        }
        
        &:disabled {         
            & ~ ${ButtonStyled} {
                cursor: default;   
                background: ${radioColors.checkboxOffBodyDisabled};
                border-color: ${radioColors.checkboxOffDisabled};
            }
            
            & ~ ${RadioTypograpyStyled} {
                cursor: default;   
                color: ${radioColors.checkboxTextDisabled};
            }
        }
        
        body:not(.pointer-events) &:focus {
            & ~ ${ButtonStyled} {
                border: 0;
                box-shadow: 0 0 0 2px ${radioColors.focusColor};
            }
        }
        
        &:checked {
            & ~ ${ButtonStyled} {
                cursor: default;
                transition: 0s background-color;
                background-color: ${radioColors.checkboxOnNormal};
                border-color: ${radioColors.checkboxOnNormal};
    
                &::before {
                    background-color: ${radioColors.checkboxToggle};
                    animation: ${radioSpringAnimation} ${checkedAnimationDuration} linear;
                    transition: 0s background-color;
                }
            }
           
            & ~ ${RadioTypograpyStyled} {
                cursor: default;   
                color: ${radioColors.checkboxOnText};
            }
            
            &:disabled {
                & ~ ${ButtonStyled} {
                    background-color: ${radioColors.checkboxOnDisabled};
        
                    &::before {
                        background-color: ${radioColors.checkboxOnToggleDisabled};
                    }
                }
                 
                & ~ ${RadioTypograpyStyled} {
                    cursor: default;   
                    color: ${radioColors.checkboxTextDisabled};
                }
            }
        }
`
})

export const RadioWrapperLabelStyled = styled('label')`
    display: flex;
    position: relative;
    cursor: auto;
`
