declare module '@sbol/design-system/core/styles/dynamic-styles' {
    import type { CSSObject } from '@emotion/serialize'
    import type * as Theme from '@sbol/design-system/core/styles/light.theme.style'

    export type ColorScheme = string
    export type DSTheme = typeof Theme

    export interface Sizes {
        sm: string,
        md: string,
        lg: string
    }

    export interface BodySizes {
        body1: string,
        body2: string
    }

    export interface HSizes {
        h1: string,
        h2: string,
        h3: string,
        h4: string,
        h5: string
    }

    export type Size = keyof Sizes | keyof BodySizes | keyof HSizes
    export interface Indents {
        open: string,
        inner: string,
        micro: string,
        nano: string,
        zero: string
    }

    export type Indent = keyof Indents
    export type TextSize = {
        fontSize: string;
        lineHeight: string;
    }

    export const sizes: {
        sm: TextSize;
        md: TextSize;
        lg: TextSize;
        body1: TextSize;
        body2: TextSize;
        h1: TextSize;
        h2: TextSize;
        h3: TextSize;
        h4: TextSize;
        h5: TextSize;
    }

    export const dynamicIndent: (size?: Size, mode?: Indent) => string

    export const dynamicSize: (props: { size?: Size }) => CSSObject

    export const getColor: (theme: DSTheme, colorScheme: ColorScheme, defaultColorScheme: string) => string

    type GetDynamicColor = (defaultColorScheme: string) => ({ colorScheme, theme }: { colorScheme: ColorScheme; theme: DSTheme }) => CSSObject

    export const dynamicColor: GetDynamicColor

    export const dynamicBackgroundColor: GetDynamicColor

    export const dynamicSvgColor: GetDynamicColor

    export const focusBorder: (color: string, borderWidth?: string) => CSSObject

    export const dynamicHeight: (props: { size: Size; verticalMargin: Indent }) => number
}

declare module '@sbol/design-system/core/styles/colors.config.style' {
    /* Новая палитра. Использовать только эти цвета */
    /* НЕ ДОБАВЛЯТЬ НОВЫХ! */

    /* Calc rgba from hex value */
    export const hex2rgba: (hex: string, alpha?: number) => string

    /* RED */
    export const red9: string
    export const red85: string
    export const red8: string
    export const red75: string
    export const red7: string
    export const red6: string
    export const red5: string
    export const red4: string
    export const red3: string
    export const red2: string
    export const red15: string
    export const red1: string
    export const red05: string
    export const red0: string

    /* ORANGE */
    export const orange9: string
    export const orange85: string
    export const orange8: string
    export const orange75: string
    export const orange7: string
    export const orange6: string
    export const orange5: string
    export const orange4: string
    export const orange3: string
    export const orange2: string
    export const orange15: string
    export const orange1: string
    export const orange05: string
    export const orange0: string

    /* AMBER */
    export const amber9: string
    export const amber85: string
    export const amber8: string
    export const amber75: string
    export const amber7: string
    export const amber6: string
    export const amber5: string
    export const amber4: string
    export const amber3: string
    export const amber2: string
    export const amber15: string
    export const amber1: string
    export const amber05: string
    export const amber0: string

    /* YELLOW */
    export const yellow9: string
    export const yellow85: string
    export const yellow8: string
    export const yellow75: string
    export const yellow7: string
    export const yellow6: string
    export const yellow5: string
    export const yellow4: string
    export const yellow3: string
    export const yellow2: string
    export const yellow15: string
    export const yellow1: string
    export const yellow05: string
    export const yellow0: string

    /* SUNNY */
    export const sunny9: string
    export const sunny85: string
    export const sunny8: string
    export const sunny75: string
    export const sunny7: string
    export const sunny6: string
    export const sunny5: string
    export const sunny4: string
    export const sunny3: string
    export const sunny2: string
    export const sunny15: string
    export const sunny1: string
    export const sunny05: string
    export const sunny0: string

    /* LIME */

    export const lime9: string
    export const lime85: string
    export const lime8: string
    export const lime75: string
    export const lime7: string
    export const lime6: string
    export const lime5: string
    export const lime4: string
    export const lime3: string
    export const lime2: string
    export const lime15: string
    export const lime1: string
    export const lime05: string
    export const lime0: string

    /* HERBAL */
    export const herbal9: string
    export const herbal85: string
    export const herbal8: string
    export const herbal75: string
    export const herbal7: string
    export const herbal6: string
    export const herbal5: string
    export const herbal4: string
    export const herbal3: string
    export const herbal2: string
    export const herbal15: string
    export const herbal1: string
    export const herbal05: string
    export const herbal0: string

    /* GREEN / SBER */
    export const green9: string
    export const green85: string
    export const green8: string
    export const green75: string
    export const green7: string
    export const green6: string
    export const green5: string
    export const green4: string
    export const green3: string
    export const green2: string
    export const green15: string
    export const green1: string
    export const green05: string
    export const green0: string

    /* TEAL */
    export const teal9: string
    export const teal85: string
    export const teal8: string
    export const teal75: string
    export const teal7: string
    export const teal6: string
    export const teal5: string
    export const teal4: string
    export const teal3: string
    export const teal2: string
    export const teal15: string
    export const teal1: string
    export const teal05: string
    export const teal0: string

    /* AQUA */
    export const aqua9: string
    export const aqua85: string
    export const aqua8: string
    export const aqua75: string
    export const aqua7: string
    export const aqua6: string
    export const aqua5: string
    export const aqua4: string
    export const aqua3: string
    export const aqua2: string
    export const aqua15: string
    export const aqua1: string
    export const aqua05: string
    export const aqua0: string

    /* SKY BLUE */
    export const skyBlue9: string
    export const skyBlue85: string
    export const skyBlue8: string
    export const skyBlue75: string
    export const skyBlue7: string
    export const skyBlue6: string
    export const skyBlue5: string
    export const skyBlue4: string
    export const skyBlue3: string
    export const skyBlue2: string
    export const skyBlue15: string
    export const skyBlue1: string
    export const skyBlue05: string
    export const skyBlue0: string

    /* BLUE */
    export const blue9: string
    export const blue85: string
    export const blue8: string
    export const blue75: string
    export const blue7: string
    export const blue6: string
    export const blue5: string
    export const blue4: string
    export const blue3: string
    export const blue2: string
    export const blue15: string
    export const blue1: string
    export const blue05: string
    export const blue0: string

    /* ELECTRIC BLUE */
    export const electricBlue9: string
    export const electricBlue85: string
    export const electricBlue8: string
    export const electricBlue75: string
    export const electricBlue7: string
    export const electricBlue6: string
    export const electricBlue5: string
    export const electricBlue4: string
    export const electricBlue3: string
    export const electricBlue2: string
    export const electricBlue15: string
    export const electricBlue1: string
    export const electricBlue05: string
    export const electricBlue0: string


    /* VIOLET */
    export const violet9: string
    export const violet85: string
    export const violet8: string
    export const violet75: string
    export const violet7: string
    export const violet6: string
    export const violet5: string
    export const violet4: string
    export const violet3: string
    export const violet2: string
    export const violet15: string
    export const violet1: string
    export const violet05: string
    export const violet0: string

    /* PURPLE */
    export const purple9: string
    export const purple85: string
    export const purple8: string
    export const purple75: string
    export const purple7: string
    export const purple6: string
    export const purple5: string
    export const purple4: string
    export const purple3: string
    export const purple2: string
    export const purple15: string
    export const purple1: string
    export const purple05: string
    export const purple0: string

    /* PINK */
    export const pink9: string
    export const pink85: string
    export const pink8: string
    export const pink75: string
    export const pink7: string
    export const pink6: string
    export const pink5: string
    export const pink4: string
    export const pink3: string
    export const pink2: string
    export const pink15: string
    export const pink1: string
    export const pink05: string
    export const pink0: string

    /* GRAY */
    export const gray9: string
    export const gray85: string
    export const gray8: string
    export const gray75: string
    export const gray7: string
    export const gray6: string
    export const gray5: string
    export const gray4: string
    export const gray3: string
    export const gray2: string
    export const gray15: string
    export const gray1: string
    export const gray05: string
    export const gray0: string

    /* GRAY ALPHA */
    export const gray0A: string
    export const gray4A: string
    export const gray8A: string
    export const gray12A: string
    export const gray16A: string
    export const gray24A: string
    export const gray40A: string
    export const gray55A: string
    export const gray60A: string
    export const gray70A: string

    /* COOl GRAY */
    export const coolGray9: string
    export const coolGray85: string
    export const coolGray8: string
    export const coolGray75: string
    export const coolGray7: string
    export const coolGray6: string
    export const coolGray5: string
    export const coolGray4: string
    export const coolGray3: string
    export const coolGray2: string
    export const coolGray15: string
    export const coolGray1: string
    export const coolGray05: string
    export const coolGray0: string

    /* GRAPHITE */
    export const graphite9: string
    export const graphite8: string
    export const graphite7: string
    export const graphite6: string
    export const graphite5: string
    export const graphite4: string
    export const graphite3: string
    export const graphite2: string
    export const graphite1: string
    export const graphite0: string

    /* WHITE */
    export const white: string

    /* WHITE ALPHA */
    export const white0A: string
    export const white4A: string
    export const white8A: string
    export const white12A: string
    export const white16A: string
    export const white24A: string
    export const white40A: string
    export const white55A: string
    export const white60A: string
    export const white70A: string

    /* BLACK */
    export const black: string
}

declare module '@sbol/design-system/core/styles/font-sizes.config.style' {
    export const fontSizeHeadline1: string
    export const lineHeightHeadline1: string

    export const fontSizeHeadline2: string
    export const lineHeightHeadline2: string

    export const fontSizeHeadline3: string
    export const lineHeightHeadline3: string

    export const fontSizeHeadline4: string
    export const lineHeightHeadline4: string

    export const fontSizeHeadline5: string
    export const lineHeightHeadline5: string

    export const letterSpacingHeadline: string
    export const letterSpacing: string

    export const fontSizeLg: string
    export const lineHeightLg: string

    export const fontSizeBody1: string
    export const lineHeightBody1: string

    export const fontSizeMd: string
    export const lineHeightMd: string

    export const fontSizeBody2: string
    export const lineHeightBody2: string

    export const fontSizeSm: string
    export const lineHeightSm: string
}

declare module '@sbol/design-system/core/styles/offsets.config.style' {
    export const offsetXs: string
    export const offsetSm: string
    export const offsetMd: string
    export const offsetLg: string
    export const offsetXl: string
}

declare module '@sbol/design-system/core/styles/radius.config.style' {
    import type { CSSObject } from '@emotion/serialize'

    export interface Sizes {
        sm: string,
        md: string,
        lg: string
    }

    export const xsBorderRadius: string
    export const smBorderRadius: string
    export const mdBorderRadius: string
    export const lgBorderRadius: string

    interface Sizes {
        xs: string,
        sm: string,
        md: string,
        lg: string
    }

    export type BorderRadiusSize = keyof Sizes

    export const borderRadius: (size?: BorderRadiusSize) => CSSObject
}

declare module '@sbol/design-system/core/styles/semantic.config.style' {
    export const baseX: number
}

declare module '@sbol/design-system/core/styles/shadows.config.style' {
    import type * as Theme from '@sbol/design-system/core/styles/light.theme.style'

    export type DSTheme = typeof Theme

    export const xxsShadow: (theme: DSTheme) => string
    export const xsShadow: (theme: DSTheme) => string
    export const smShadow: (theme: DSTheme) => string
    export const mdShadow: (theme: DSTheme) => string
    export const lgShadow: (theme: DSTheme) => string
    export const xlShadow: (theme: DSTheme) => string
}

declare module '@sbol/design-system/core/styles/z-index.config.style' {
    export const zIndexTooltip: string
    export const zIndexCollapse: string
    export const zIndexHeaderSearch: string
    export const zIndexDropdown: string
    export const zIndexChat: string
    export const zIndexProduct: string
    export const zIndexHeaderNavigationMobile: string
    export const zIndexHeaderSearchMobile: string
    export const zIndexCollapseMobile: string
    export const zIndexDropdownMobile: string
    export const zIndexProductMobile: string
    export const zIndexPopupNotifications: string
    export const zIndexGlobalLoader: string
}

declare module '@sbol/design-system/core/styles/light.theme.style' {
    export const noColor: string
    export const transparent: string

    export const primary: string
    export const secondary: string
    export const tertiary: string

    export const whitePrimary: string
    export const whiteSecondary: string
    export const whiteTertiary: string

    export const white: string

    export const brandPrimary: string
    export const brandSecondary: string
    export const brandTertiary: string
    export const brandQuaternary: string

    export const brandTransparent40: string
    export const brandTransparent24: string
    export const brandTransparent16: string
    export const brandTransparent8: string

    export const brand: string

    export const successPrimary: string
    export const successSecondary: string
    export const successTertiary: string
    export const successQuaternary: string

    export const successTransparent40: string
    export const successTransparent24: string
    export const successTransparent16: string
    export const successTransparent8: string

    export const success: string

    export const infoPrimary: string
    export const infoSecondary: string
    export const infoTertiary: string
    export const infoQuaternary: string

    export const infoTransparent40: string
    export const infoTransparent24: string
    export const infoTransparent16: string
    export const infoTransparent8: string

    export const info: string

    export const warningPrimary: string
    export const warningSecondary: string
    export const warningTertiary: string
    export const warningQuaternary: string

    export const warningTransparent40: string
    export const warningTransparent24: string
    export const warningTransparent16: string
    export const warningTransparent8: string

    export const warning: string

    export const additional100: string
    export const additional60: string
    export const additional40: string
    export const additional24: string
    export const additional16: string
    export const additional8: string
    export const additional4: string

    export const focusColor: string

    export const backgroundZero: string
    export const backgroundOne: string
    export const backgroundOneNeutral: string
    export const backgroundOneSuccess: string
    export const backgroundOneInfo: string
    export const backgroundOneWarning: string

    /* SberPrivateBanking */
    export const sberPrivateBanking1150: string
    export const sberPrivateBanking900: string
    export const sberPrivateBanking450: string
    export const sberPrivateBanking200: string

    export const sberPrivateBanking950: string
    export const sberPrivateBanking600: string

    /* SberPervyi  */
    export const sberPervyi750: string
    export const sberPervyi700: string
    export const sberPervyi650: string
    export const sberPervyi600: string

    /* Компонентные семантические цвета */

    /* Divider */
    export const dividerThin: string
    export const dividerFat: string

    /* Shadow */
    export const firstShadow: string
    export const secondShadow: string

    /* Elevation Wrapper */

    /* Elevation Zero */
    export const elevationZeroBody: string
    export const elevationZeroBorderNormal: string
    export const elevationZeroBorderHover: string
    export const elevationZeroBorderClick: string
    export const elevationZeroBorderActiveNormal: string
    export const elevationZeroBorderActiveHover: string
    export const elevationZeroBorderActiveClick: string

    /* Elevation One */
    export const elevationOneBody: string
    export const elevationOneBorderNormal: string
    export const elevationOneBorderHover: string
    export const elevationOneBorderClick: string
    export const elevationOneBorderActiveNormal: string
    export const elevationOneBorderActiveHover: string
    export const elevationOneBorderActiveClick: string

    /* Checkbox */
    export const checkboxOnNormal: string
    export const checkboxOnHover: string
    export const checkboxOnClick: string
    export const checkboxOnDisabled: string

    export const checkboxOffBody: string
    export const checkboxOffBodyDisabled: string

    export const checkboxOffNormal: string
    export const checkboxOffHover: string
    export const checkboxOffClick: string
    export const checkboxOffDisabled: string

    export const checkboxWarningNormal: string
    export const checkboxWarningHover: string
    export const checkboxWarningClick: string

    export const checkboxTextWarning: string

    export const checkboxToggle: string
    export const checkboxOffToggleDisabled: string
    export const checkboxOnToggleDisabled: string

    export const checkboxOffTextNormal: string
    export const checkboxOffTextHover: string
    export const checkboxOffTextClick: string

    export const checkboxOnText: string
    export const checkboxTextDisabled: string

    export const checkboxTextWarningNormal: string
    export const checkboxTextWarningHover: string
    export const checkboxTextWarningClick: string

    /* Field */
    export const fieldBody: string
    export const fieldBodyDisabled: string

    export const fieldBorderNormal: string
    export const fieldBorderHover: string
    export const fieldBorderClick: string
    export const fieldBorderDisabled: string
    export const fieldBorderReadOnly: string

    export const fieldWarning: string

    export const fieldBorderWarningNormal: string
    export const fieldBorderWarningHover: string
    export const fieldBorderWarningClick: string

    export const fieldLabel: string
    export const fieldLabelFilled: string

    export const fieldLabelIconNormal: string
    export const fieldLabelIconHover: string

    export const fieldDescription: string

    export const fieldPlaceholder: string

    export const fieldValue: string
    export const fieldValueDisabled: string

    export const fieldAdditional: string

    export const fieldToggleBody: string
    export const fieldToggleBodyDisabled: string

    export const fieldToggleBorderNormal: string
    export const fieldToggleBorderHover: string
    export const fieldToggleBorderClick: string
    export const fieldToggleBorderDisabled: string

    export const fieldToggleBorderWarningNormal: string
    export const fieldToggleBorderWarningHover: string
    export const fieldToggleBorderWarningClick: string

    /* Button */

    /* Button Solid */
    export const buttonSolidBodyNormal: string
    export const buttonSolidBodyHover: string
    export const buttonSolidBodyClick: string

    export const buttonSolidText: string

    /* Button Stroke */
    export const buttonStrokeBody: string
    export const buttonStrokeBorderNormal: string
    export const buttonStrokeBorderHover: string
    export const buttonStrokeBorderClick: string

    export const buttonStrokeText: string

    /* Button Transparent*/
    export const buttonTransparentBodyNormal: string
    export const buttonTransparentBodyHover: string
    export const buttonTransparentBodyClick: string
    export const buttonTransparentBodyDisabled: string

    export const buttonTransparentText: string
    export const buttonTransparentTextDisabled: string

    /* Button Dashed */
    export const buttonDashedNormal: string
    export const buttonDashedHover: string
    export const buttonDashedClick: string

    /* Button Elevation */
    export const buttonElevationText: string
    export const buttonElevationBody: string
    export const buttonElevationBoderNormal: string
    export const buttonElevationBoderHover: string
    export const buttonElevationBoderClick: string

    /* Link*/

    /* Link Primary */
    export const linkPrimaryNormal: string
    export const linkPrimaryHover: string
    export const linkPrimaryClick: string

    /* Link Success */
    export const linkSuccessNormal: string
    export const linkSuccessHover: string
    export const linkSuccessClick: string

    /* Link Info */
    export const linkInfoNormal: string
    export const linkInfoHover: string
    export const linkInfoClick: string

    /* Link Warning */
    export const linkWarningNormal: string
    export const linkWarningHover: string
    export const linkWarningClick: string

    /* Link Default */
    export const linkNormal: string
    export const linkHover: string
    export const linkClick: string
    export const linkDisabled: string

    /* SegmentedRadio */
    export const segmentedRadioOffBodyNormal: string
    export const segmentedRadioOffBodyHover: string
    export const segmentedRadioOffBodyClick: string
    export const segmentedRadioOffBodyDisabled: string

    export const segmentedRadioOffText: string
    export const segmentedRadioOffTextDisabled: string

    export const segmentedRadioOnBody: string
    export const segmentedRadioOnText: string

    export const segmentedRadioGroupBorder: string

    /* Dropdown */
    export const dropdownBody: string
    export const dropdownBorder: string
    export const dropdownText: string

    export const dropdownItemNormal: string
    export const dropdownItemHover: string
    export const dropdownItemClick: string

    export const dropdownItemSelectedNormal: string
    export const dropdownItemSelectedHover: string
    export const dropdownItemSelectedClick: string

    /* Tags */
    export const tagText: string
    export const tagTextDisabled: string

    export const tagBodyNormal: string
    export const tagBodyHover: string
    export const tagBodyClick: string

    export const tagBorderNormal: string
    export const tagBorderHover: string
    export const tagBorderClick: string

    export const tagIconNormal: string
    export const tagIconHover: string
    export const tagIconClick: string

    /* Accordion */
    export const accordionTextNormal: string
    export const accordionTextHover: string
    export const accordionTextClick: string

    export const accordionBody: string
    export const accordionDescription: string
    export const accordionBorder: string

    /* Table*/
    export const tableBody: string
    export const tableBorder: string
    export const tableLabel: string

    /* Alert */
    export const alertTitle: string
    export const alertDescription: string

    export const alertSuccessBody: string
    export const alertSuccessBorder: string
    export const alertSuccessIcon: string
    export const alertSuccessActions: string

    export const alertDraftBody: string
    export const alertDraftBorder: string
    export const alertDraftIcon: string
    export const alertDraftActions: string

    export const alertWarningBody: string
    export const alertWarningBorder: string
    export const alertWarningIcon: string
    export const alertWarningActions: string

    export const alertInfoBody: string
    export const alertInfoBorder: string
    export const alertInfoIcon: string
    export const alertInfoActions: string

    /* Card */
    export const cardButtonBodyNormal: string
    export const cardButtonBodyHover: string
    export const cardButtonBodyClick: string

    export const cardButtonIconNormal: string
    export const cardButtonIconHover: string

    export const cardButtonIconBrand: string

    export const cardIconSolid: string
    export const cardIconTransparent: string

    export const cardIconTransparentBody: string
    export const cardIconSolidBody: string

    export const cardAdditionalButtonBody: string
    export const cardAdditionalButtonIcon: string

    export const cardLabel: string
    export const cardDescription: string

    /* Banner */
    export const bannerSuccess: string
    export const bannerWarning: string
    export const bannerInfo: string
    export const bannerDraft: string

    export const bannerNavigationButtonNormal: string
    export const bannerNavigationButtonHover: string
    export const bannerNavigationButtonClick: string

    /* Tooltip */
    export const tooltipBody: string
    export const tooltipTitle: string
    export const tooltipDescription: string
    export const tooltipBorder: string
    export const tooltipTextBorder: string

    /* HorizontalScroll */
    export const horizontalScrollGradientFrom: string
    export const horizontalScrollGradientTo: string

    /* Tabs */
    export const tabsStickyBody: string
    export const tabsBorder: string

    export const tabBody: string
    export const tabTextNormal: string
    export const tabTextHover: string

    export const tabIndicatorNormal: string
    export const tabIndicatorHover: string

    export const tabSelectedText: string
    export const tabSelectedIndicator: string

    /* Loader */
    export const loaderBodyPrimary: string
    export const loaderBodySecondary: string

    /* LoaderIcon */
    export const loaderIconBorder: string
    export const loaderIconLoader: string
    export const loaderIconBorderPrimary: string
    export const loaderIconLoaderPrimary: string
    export const ieLoaderIconLoaderPrimary: string
    export const loaderIconLoaderSecondary: string
    export const loaderIconBorderSecondary: string

    /* Calendar */
    export const calendarBody: string
    export const calendarBorder: string

    export const calendarTextNormal: string
    export const calendarTextHover: string
    export const calendarTextDisabled: string

    export const calendarTextActive: string

    export const calendarTextWeekend: string

    export const calendarButtonNormal: string
    export const calendarButtonHover: string
    export const calendarButtonClick: string

    export const calendarButtonActive: string

    export const calendarButtonCurrent: string

    export const calendarButtonCurrentActive: string

    export const calendarButtonWarning: string
    export const calendarButtonRange: string

    export const calendarSubmitButton: string
    export const calendarSubmitButtonDisabled: string

    /* Stages */
    export const stagesBorder: string
    export const stagesBody: string
    export const stagesText: string

    export const stagesSuccessBorder: string
    export const stagesSuccessBody: string
    export const stagesSuccessText: string

    export const stagesTagText: string

    /* Icon Products colors */
    export const iconProductGoals: string
    export const iconProductCredit: string
    export const iconProductDeposit: string
    export const iconProductCard: string

    /* Icon */
    export const iconDraft: string
}

declare module '@sbol/design-system/core/styles/dark.theme.style' {
    export * from '@sbol/design-system/core/styles/light.theme.style'
}

declare module '@sbol/design-system/core/styles/animation-timing-functions' {
    export const sbolEase: string
    export const sbolEaseIn: string
    export const sbolEaseOut: string
}

declare module '@sbol/design-system/core/styles/theme-colors' {
    import type * as Theme from '@sbol/design-system/core/styles/light.theme.style'

    export type DSTheme = typeof Theme

    type Colors = {
        LIGHT: DSTheme;
        DARK: DSTheme;
    }

    const colors: Colors

    export default colors
}
