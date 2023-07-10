import { ColorScheme, OnFocusOrBlurButton, OnFocusOrBlurInput } from '../../..'
import { TextFieldMaskedOnChange, TextFieldMaskedProps } from '../masked'
import { ValueSelectOnChange, ValueSelectProps } from '../../value-select'
import { LabeledProps } from '../../labeled'


export type SliderMode = 'segmented'

export type SliderMin = number | string

export type SliderMax = number | string

export type SliderStep = number | string

export type SliderGrid = number | string

export interface SliderOptions {
    title?: string;
    value?: string | number;
}

export interface SliderProps extends Omit<TextFieldMaskedProps & ValueSelectProps, 'onChange' | 'onFocus' | 'onBlur' | 'mode'> {
    colorScheme?: ColorScheme;
    /**
     * "segmented" for render delimiters
     */
    mode?: SliderMode;
    onChange?: ValueSelectOnChange | TextFieldMaskedOnChange;
    onFocus?: OnFocusOrBlurButton;
    onBlur?: OnFocusOrBlurButton | OnFocusOrBlurInput;
    active?: boolean;
    min?: SliderMin;
    max?: SliderMax;
    step?: SliderStep;
    /**
     * Auto generation of step. props.step with this prop is wanted step size or below
     */
    digits?: Array<number>;
    /**
     * Array of prepared grid values (for example 100, 200, 500, 1000, 10000, 100000)
     */
    grid?: Array<SliderGrid>;
    /**
     * Array of select options (title, value)
     */
    options?: Array<SliderOptions>;
    error?: string;
    prefix?: string;
    suffix?: string;
    // placeholder?: string;
    // id?: string;
    transitionDuration?: number;
    tabIndex?: number;
}

export const Slider: React.FC<SliderProps>

export const LabeledSlider: React.FC<SliderProps & LabeledProps>
