import { ScrollContainer } from '../..'

export interface StagesTranslations {
    tooltip: string;
}

export interface StagesProps {
    children: React.ReactNode;
    translations: StagesTranslations;
    progress: number;
    className?: string;
    scrollContainer?: ScrollContainer;
}

export const Stages: React.FC<StagesProps>

export interface StepTranslations {
    tooltip: string;
}

export interface StepProps {
    value?: number;
    step?: number;
    translations?: StepTranslations;
    title: string;
}

export const Step: React.FC<StepProps>
