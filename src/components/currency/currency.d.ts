import { FontWeight, HSizes, Mode, Sizes } from '../..'
import { TypographyProps } from '../typography'

export type CurrencySize = keyof Sizes | keyof HSizes

export type CurrencyMode = keyof Mode

export type CurrencyFontWeight = keyof FontWeight

export interface CurrencyProps extends Omit<TypographyProps, 'children' | 'size'> {
    /**
     * Только для mode="auto" или "word" с Currency.setCurrencyDisplayName
     */
    value?: string;
    title?: string;
    size?: CurrencySize;
    mode?: CurrencyMode;
}

export const Currency: React.FC<CurrencyProps>
