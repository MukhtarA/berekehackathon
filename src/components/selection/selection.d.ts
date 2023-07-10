import { Indent, StandartSizes } from '../..'

import { MarginWrapperProps, ContainerProps } from './../indent-wrapper'

export interface SelectionGroupA11y {
    label?: string;
}

export interface SelectionGroupProps extends MarginWrapperProps {
    size?: StandartSizes;
    children?: React.ReactNode;
    title?: string;
    a11y?: SelectionGroupA11y;
}

export const SelectionGroup: React.FC<SelectionGroupProps>

export type CheckboxValue = string | boolean

export type CheckboxMode = 'switch' | 'checkbox'

export type CheckboxOnChange = (value: boolean, event: React.SyntheticEvent<HTMLInputElement>) => void
export interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
    children?: React.ReactNode;
    disabled?: boolean;
    checked?: boolean;
    value?: CheckboxValue;
    onChange?: CheckboxOnChange;
    error?: string;
    formName?: string;
    mode?: CheckboxMode;
    size?: StandartSizes;
    verticalMargin?: Indent;
}

export const Checkbox: React.FC<CheckboxProps>

export interface LabeledCheckboxProps extends CheckboxProps {
    description?: string;
}

export const LabeledCheckbox: React.FC<LabeledCheckboxProps>

export interface RadioProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
    name?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    value?: string;
    error?: string;
    formName?: string;
    size?: StandartSizes;
    className?: string;
    verticalMargin?: Indent;
    checked?: boolean;
}

export const Radio: React.FC<RadioProps>

export interface LabeledRadioProps extends RadioProps {
    description?: string;
}

export const LabeledRadio: React.FC<LabeledRadioProps>

export interface SegmentedRadioA11y {
    title?: string;
}

export interface SegmentedRadioProps extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
    a11y?: SegmentedRadioA11y;
    size?: StandartSizes;
    className?: string;
}

export const SegmentedRadio: React.FC<SegmentedRadioProps>

export interface SegmentedGroupProps extends ContainerProps {
    name: string;
    size?: StandartSizes;
    children?: React.ReactNode;
    ariaLabelledby?: string;
}

export const SegmentedGroup: React.FC<SegmentedGroupProps>

export type SegmentedScrollGroupProps = SegmentedGroupProps
export const SegmentedScrollGroup: React.FC<SegmentedScrollGroupProps>
