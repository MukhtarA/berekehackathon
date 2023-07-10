import { SegmentedRadioProps } from '../../selection'

export interface CurrencySelectProps extends SegmentedRadioProps {
    readonly?: boolean;
    options?: Array<unknown>;
}

export const CurrencySelect: React.FC<CurrencySelectProps>
