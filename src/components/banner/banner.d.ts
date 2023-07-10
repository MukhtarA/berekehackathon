import { Status } from '../..'

export type BannerDescription = string | React.ReactNode

export type BannerColorScheme = keyof Omit<Status, 'primary'>

export interface BannerProps extends React.HTMLProps<HTMLDivElement> {
    title?: string
    description?: BannerDescription
    children?: React.ReactNode
    colorScheme?: BannerColorScheme
    imageSrc?: string
    srcSet?: string
}

export const Banner: React.FC<BannerProps>
