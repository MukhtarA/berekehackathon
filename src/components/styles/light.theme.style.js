import * as colors from './colors.config.style'
/* BASICS: Основные цвета из палитры */
/* https://www.figma.com/file/G5ckzQuZrPcITHvEWCxQzh/06%E3%83%BBWeb%E3%83%BBTokens?node-id=0%3A1 */

export const noColor = colors.white
export const transparent = colors.white0A

export const primary = colors.gray8
export const secondary = colors.gray70A
export const tertiary = colors.gray55A

export const whitePrimary = colors.white
export const whiteSecondary = colors.white70A
export const whiteTertiary = colors.white55A

export const white = whitePrimary

export const brandPrimary = colors.green5
export const brandSecondary = colors.green6
export const brandTertiary = colors.green7
export const brandQuaternary = colors.green75

export const brandTransparent40 = colors.hex2rgba(brandPrimary, 40)
export const brandTransparent24 = colors.hex2rgba(brandPrimary, 24)
export const brandTransparent16 = colors.hex2rgba(brandPrimary, 16)
export const brandTransparent8 = colors.hex2rgba(brandPrimary, 8)

export const brand = brandPrimary

export const successPrimary = colors.green5
export const successSecondary = colors.green6
export const successTertiary = colors.green7
export const successQuaternary = colors.green75

export const successTransparent40 = colors.hex2rgba(successPrimary, 40)
export const successTransparent24 = colors.hex2rgba(successPrimary, 24)
export const successTransparent16 = colors.hex2rgba(successPrimary, 16)
export const successTransparent8 = colors.hex2rgba(successPrimary, 8)

export const success = successPrimary

export const infoPrimary = colors.violet5
export const infoSecondary = colors.violet6
export const infoTertiary = colors.violet7
export const infoQuaternary = colors.violet75

export const infoTransparent40 = colors.hex2rgba(infoPrimary, 40)
export const infoTransparent24 = colors.hex2rgba(infoPrimary, 24)
export const infoTransparent16 = colors.hex2rgba(infoPrimary, 16)
export const infoTransparent8 = colors.hex2rgba(infoPrimary, 8)

export const info = infoPrimary

export const warningPrimary = colors.orange5
export const warningSecondary = colors.orange6
export const warningTertiary = colors.orange7
export const warningQuaternary = colors.orange75

export const warningTransparent40 = colors.hex2rgba(warningPrimary, 40)
export const warningTransparent24 = colors.hex2rgba(warningPrimary, 24)
export const warningTransparent16 = colors.hex2rgba(warningPrimary, 16)
export const warningTransparent8 = colors.hex2rgba(warningPrimary, 8)

export const warning = warningPrimary

export const additional100 = colors.gray8
export const additional60 = colors.gray60A
export const additional40 = colors.gray40A
export const additional24 = colors.gray24A
export const additional16 = colors.gray16A
export const additional8 = colors.gray8A
export const additional4 = colors.gray4A

export const focusColor = primary

export const backgroundZero = white
export const backgroundOne = '#F5F5F5'
export const backgroundOneNeutral = '#F5F5F5'
export const backgroundOneSuccess = '#EFFCF0'
export const backgroundOneInfo = '#F8F6FB'
export const backgroundOneWarning = '#FCF3EF'

/* SberPrivateBanking */
export const sberPrivateBanking1150 = '#333F48'
export const sberPrivateBanking900 = '#566A7A'
export const sberPrivateBanking450 = '#A8B6C1'
export const sberPrivateBanking200 = '#D9E0E4'

export const sberPrivateBanking950 = '#A1A41D'
export const sberPrivateBanking600 = '#DEE157'

/* SberPervyi  */
export const sberPervyi750 = '#840F57'
export const sberPervyi700 = '#A2125E'
export const sberPervyi650 = '#C40F64'
export const sberPervyi600 = '#E30066'

/* Компонентные семантические цвета */

/* Divider */
export const dividerThin = additional8
export const dividerFat = additional4

/* Shadow */
export const firstShadow = additional4
export const secondShadow = additional16

/* Elevation Wrapper */

/* Elevation Zero */
export const elevationZeroBody = noColor
export const elevationZeroBorderNormal = additional24
export const elevationZeroBorderHover = additional40
export const elevationZeroBorderClick = additional60
export const elevationZeroBorderActiveNormal = brandSecondary
export const elevationZeroBorderActiveHover = brandTertiary
export const elevationZeroBorderActiveClick = brandQuaternary

/* Elevation One */
export const elevationOneBody = noColor
export const elevationOneBorderNormal = additional8
export const elevationOneBorderHover = additional16
export const elevationOneBorderClick = additional40
export const elevationOneBorderActiveNormal = brandSecondary
export const elevationOneBorderActiveHover = brandTertiary
export const elevationOneBorderActiveClick = brandQuaternary

/* Checkbox */
export const checkboxOnNormal = successPrimary
export const checkboxOnHover = successSecondary
export const checkboxOnClick = successTertiary
export const checkboxOnDisabled = successPrimary

export const checkboxOffBody = noColor
export const checkboxOffBodyDisabled = additional16

export const checkboxOffNormal = additional24
export const checkboxOffHover = additional40
export const checkboxOffClick = additional60
export const checkboxOffDisabled = additional24

export const checkboxWarningNormal = warningPrimary
export const checkboxWarningHover = warningSecondary
export const checkboxWarningClick = warningTertiary

export const checkboxTextWarning = warningSecondary

export const checkboxToggle = whitePrimary
export const checkboxOffToggleDisabled = whiteSecondary
export const checkboxOnToggleDisabled = '#B8DDBF'

export const checkboxOffTextNormal = primary
export const checkboxOffTextHover = secondary
export const checkboxOffTextClick = primary

export const checkboxOnText = primary
export const checkboxTextDisabled = tertiary

export const checkboxTextWarningNormal = warningSecondary
export const checkboxTextWarningHover = warningTertiary
export const checkboxTextWarningClick = warningQuaternary

/* Field */
export const fieldBody = noColor
export const fieldBodyDisabled = additional4

export const fieldBorderNormal = additional24
export const fieldBorderHover = additional40
export const fieldBorderClick = additional60
export const fieldBorderDisabled = additional16
export const fieldBorderReadOnly = additional24

export const fieldWarning = warningSecondary

export const fieldBorderWarningNormal = warningSecondary
export const fieldBorderWarningHover = warningTertiary
export const fieldBorderWarningClick = warningQuaternary

export const fieldLabel = primary
export const fieldLabelFilled = tertiary

export const fieldLabelIconNormal = tertiary
export const fieldLabelIconHover = primary

export const fieldDescription = secondary

export const fieldPlaceholder = tertiary

export const fieldValue = primary
export const fieldValueDisabled = tertiary

export const fieldAdditional = secondary

export const fieldToggleBody = whitePrimary
export const fieldToggleBodyDisabled = colors.gray0

export const fieldToggleBorderNormal = brandPrimary
export const fieldToggleBorderHover = brandSecondary
export const fieldToggleBorderClick = brandTertiary
export const fieldToggleBorderDisabled = colors.gray1

export const fieldToggleBorderWarningNormal = warningSecondary
export const fieldToggleBorderWarningHover = warningTertiary
export const fieldToggleBorderWarningClick = warningQuaternary

/* Button */

/* Button Solid */
export const buttonSolidBodyNormal = brandPrimary
export const buttonSolidBodyHover = additional24
export const buttonSolidBodyClick = additional40

export const buttonSolidText = whitePrimary

/* Button Stroke */
export const buttonStrokeBody = transparent
export const buttonStrokeBorderNormal = additional24
export const buttonStrokeBorderHover = additional40
export const buttonStrokeBorderClick = additional60

export const buttonStrokeText = primary

/* Button Transparent*/
export const buttonTransparentBodyNormal = transparent
export const buttonTransparentBodyHover = additional4
export const buttonTransparentBodyClick = additional8
export const buttonTransparentBodyDisabled = additional8

export const buttonTransparentText = primary
export const buttonTransparentTextDisabled = additional24

/* Button Dashed */
export const buttonDashedNormal = primary
export const buttonDashedHover = secondary
export const buttonDashedClick = primary

/* Button Elevation */
export const buttonElevationText = primary
export const buttonElevationBody = elevationOneBody
export const buttonElevationBoderNormal = elevationOneBorderNormal
export const buttonElevationBoderHover = elevationOneBorderHover
export const buttonElevationBoderClick = elevationOneBorderClick

/* Link*/

/* Link Primary */
export const linkPrimaryNormal = primary
export const linkPrimaryHover = secondary
export const linkPrimaryClick = primary

/* Link Success */
export const linkSuccessNormal = successSecondary
export const linkSuccessHover = successTertiary
export const linkSuccessClick = successQuaternary

/* Link Info */
export const linkInfoNormal = infoSecondary
export const linkInfoHover = infoTertiary
export const linkInfoClick = infoQuaternary

/* Link Warning */
export const linkWarningNormal = warningSecondary
export const linkWarningHover = warningTertiary
export const linkWarningClick = warningQuaternary

/* Link Default */
export const linkNormal = linkPrimaryNormal
export const linkHover = linkPrimaryHover
export const linkClick = linkPrimaryClick
export const linkDisabled = tertiary

/* SegmentedRadio */
export const segmentedRadioOffBodyNormal = noColor
export const segmentedRadioOffBodyHover = additional8
export const segmentedRadioOffBodyClick = additional16
export const segmentedRadioOffBodyDisabled = additional8

export const segmentedRadioOffText = primary
export const segmentedRadioOffTextDisabled = additional24

export const segmentedRadioOnBody = brandPrimary
export const segmentedRadioOnText = whitePrimary

export const segmentedRadioGroupBorder = dividerThin

/* Dropdown */
export const dropdownBody = elevationOneBody
export const dropdownBorder = dividerThin
export const dropdownText = primary

export const dropdownItemNormal = noColor
export const dropdownItemHover = additional8
export const dropdownItemClick = additional16

export const dropdownItemSelectedNormal = brandTransparent16
export const dropdownItemSelectedHover = brandTransparent16
export const dropdownItemSelectedClick = brandTransparent24

/* Tags */
export const tagText = primary
export const tagTextDisabled = tertiary

export const tagBodyNormal = additional4
export const tagBodyHover = additional16
export const tagBodyClick = additional24

export const tagBorderNormal = additional8
export const tagBorderHover = additional16
export const tagBorderClick = additional24

export const tagIconNormal = additional24
export const tagIconHover = additional60
export const tagIconClick = primary

/* Accordion */
export const accordionTextNormal = primary
export const accordionTextHover = secondary
export const accordionTextClick = primary

export const accordionBody = transparent
export const accordionDescription = secondary
export const accordionBorder = additional4

/* Table*/
export const tableBody = noColor
export const tableBorder = dividerThin
export const tableLabel = secondary

/* Alert */
export const alertTitle = primary
export const alertDescription = secondary

export const alertSuccessBody = colors.green0
export const alertSuccessBorder = colors.green1
export const alertSuccessIcon = successPrimary
export const alertSuccessActions = successSecondary

export const alertDraftBody = colors.gray0
export const alertDraftBorder = colors.gray1
export const alertDraftIcon = primary
export const alertDraftActions = primary

export const alertWarningBody = colors.orange0
export const alertWarningBorder = colors.orange1
export const alertWarningIcon = warningPrimary
export const alertWarningActions = warningSecondary

export const alertInfoBody = colors.violet0
export const alertInfoBorder = colors.violet1
export const alertInfoIcon = infoPrimary
export const alertInfoActions = infoSecondary

/* Card */
export const cardButtonBodyNormal = additional4
export const cardButtonBodyHover = additional8
export const cardButtonBodyClick = additional16

export const cardButtonIconNormal = additional24
export const cardButtonIconHover = primary

export const cardButtonIconBrand = brandSecondary

export const cardIconSolid = whitePrimary
export const cardIconTransparent = colors.gray8

export const cardIconTransparentBody = brandTransparent16
export const cardIconSolidBody = brandPrimary

export const cardAdditionalButtonBody = brandTransparent16
export const cardAdditionalButtonIcon = brandPrimary

export const cardLabel = primary
export const cardDescription = tertiary

/* Banner */
export const bannerSuccess = successTransparent8
export const bannerWarning = warningTransparent8
export const bannerInfo = infoTransparent8
export const bannerDraft = additional8

export const bannerNavigationButtonNormal = colors.gray1
export const bannerNavigationButtonHover = primary
export const bannerNavigationButtonClick = primary

/* Tooltip */
export const tooltipBody = elevationOneBody
export const tooltipTitle = primary
export const tooltipDescription = secondary
export const tooltipBorder = dividerThin
export const tooltipTextBorder = secondary

/* HorizontalScroll */
export const horizontalScrollGradientFrom = noColor
export const horizontalScrollGradientTo = transparent

/* Tabs */
export const tabsStickyBody = noColor
export const tabsBorder = additional8

export const tabBody = transparent
export const tabTextNormal = secondary
export const tabTextHover = primary

export const tabIndicatorNormal = transparent
export const tabIndicatorHover = additional16

export const tabSelectedText = primary
export const tabSelectedIndicator = brandPrimary

/* Loader */
export const loaderBodyPrimary = colors.black
export const loaderBodySecondary = colors.white

/* LoaderIcon */
export const loaderIconBorder = additional8
export const loaderIconLoader = additional100
export const loaderIconBorderPrimary = additional8
export const loaderIconLoaderPrimary = additional100
export const ieLoaderIconLoaderPrimary = transparent
export const loaderIconLoaderSecondary = white
export const loaderIconBorderSecondary = whiteTertiary

/* Calendar */
export const calendarBody = dropdownBody
export const calendarBorder = dropdownBorder

export const calendarTextNormal = primary
export const calendarTextHover = primary
export const calendarTextDisabled = tertiary

export const calendarTextActive = white

export const calendarTextWeekend = brandSecondary

export const calendarButtonNormal = buttonTransparentBodyNormal
export const calendarButtonHover = buttonTransparentBodyHover
export const calendarButtonClick = buttonTransparentBodyClick

export const calendarButtonActive = brandPrimary

export const calendarButtonCurrent = brandPrimary

export const calendarButtonCurrentActive = white

export const calendarButtonWarning = warningTransparent16
export const calendarButtonRange = brandTransparent16

export const calendarSubmitButton = buttonSolidBodyNormal
export const calendarSubmitButtonDisabled = additional8

/* Stages */
export const stagesBorder = additional24
export const stagesBody = noColor
export const stagesText = tertiary

export const stagesSuccessBorder = successPrimary
export const stagesSuccessBody = successPrimary
export const stagesSuccessText = white

export const stagesTagText = primary

/* Icon Products colors */
export const iconProductGoals = colors.teal5
export const iconProductCredit = colors.blue5
export const iconProductDeposit = colors.aqua5
export const iconProductCard = colors.green5

/* Icon */
export const iconDraft = additional24
