import PropTypes from 'prop-types'
import { forEach, get } from 'lodash'

const NAME_PATTERN = /^(ref|node|data-|aria|aria-)[A-Za-z]+$/

const inputPropTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
    onContextMenu: PropTypes.func,
    tabIndex: PropTypes.number,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.array,
    additionalChild: PropTypes.node,
    additionalText: PropTypes.string,
    step: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    prefix: PropTypes.string,
    suffix: PropTypes.string
}

const userEventsPropTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    onCloseEnd: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onOpen: PropTypes.func,
    onOpenEnd: PropTypes.func
}

const metaPropTypes = {
    active: PropTypes.bool,
    asyncValidating: PropTypes.bool,
    autofilled: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    formName: PropTypes.string,
    hasServerError: PropTypes.bool,
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    submitFailed: PropTypes.bool,
    submitting: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    visited: PropTypes.bool,
    warning: PropTypes.string
}

const viewPropTypes = {
    description: PropTypes.string,
    forceOpened: PropTypes.bool,
    title: PropTypes.string,
    imageSrc: PropTypes.string,
    srcSet: PropTypes.string,
    mobileSrcSet: PropTypes.string,
    href: PropTypes.string,
    verticalPadding: PropTypes.string,
    verticalMargin: PropTypes.string,
    horizontalMargin: PropTypes.string,
    verticalMarginDirection: PropTypes.oneOf([
        'both',
        'top',
        'bottom'
    ]),
    horizontalMarginDirection: PropTypes.oneOf([
        'both',
        'left',
        'right'
    ])
}

const defaultPropTypes = {
    ...inputPropTypes,
    ...userEventsPropTypes,
    ...metaPropTypes,
    ...viewPropTypes
}

const COMPLEX_TYPES = [
    'a11y',
    'additional',
    'as',
    'autoComplete',
    'children',
    'className',
    'colorScheme',
    'fontWeight',
    'icon',
    'initialValue',
    'mode',
    'size',
    'translations',
    'tooltip',
    'value',
    'verticalPadding',
    'horizontalPadding',
    'verticalMargin',
    'verticalMarginDirection',
    'horizontalMargin',
    'horizontalMarginDirection',
    'maskOptions'
]

export const interfaceExclusions = {
    accordionOptions: ['collapsible'],
    accordionItemOptions: ['statusIcon', 'collapsible', 'unmountClosed'],
    accordionSummaryOptions: ['statusIcon', 'isOpened'],
    alertOptions: ['noIcon'],
    anchorOptions: ['sticky', 'fullWidth', 'borderless', 'scrollContainer'],
    autocompleteOptions: ['loading', 'inputMode'],
    buttonOptions: ['iconName', 'iconReverse', 'iconIndent', 'fullWidth', 'loading'],
    cardOptions: ['additionalButton', 'onAdditionalButtonClick', 'iconColorScheme', 'loaderColorScheme', 'iconName', 'external', 'loading', 'story', 'viewed'],
    cellOptions: ['lg', 'offsetLg', 'md', 'offsetMd', 'sm', 'offsetSm'],
    iconOptions: ['onError', 'name', 'namespace', 'fullWidth'],
    horizontalScrollOptions: ['scrollWidth', 'getScrollWidth', 'onScroll', 'navigation', 'scrollContainer'],
    segmentedHorizontalScrollOptions: ['scrollWidth', 'getScrollWidth', 'onScroll', 'scrollContainer'],
    linkOptions: ['iconName', 'iconReverse', 'underlined'],
    sliderOptions: ['min', 'max', 'step', 'digits', 'grid', 'options', 'transitionDuration', 'suffix'],
    typographyOptions: ['indent'],
    tableOptions: ['align'],
    tabOptions: ['parentId'],
    tooltipOptions: ['direction', 'error'],
    tabsOptions: ['onSelect', 'selectedItem', 'sticky', 'fullWidth', 'borderless', 'scrollContainer'],
    timerCardOptions: ['timerTitle', 'timerIcon'],
    menuOptions: ['position', 'activeDescendant'],
    valueSelectOptions: ['additionalDescription', 'iconColorScheme'],
    markdownOptions: ['content'],
    localPhoneOptions: ['suggest', 'initialValue'],
    suggestOptions: ['options'],
    textFieldMaskedOptions: ['onKeyPress'],
    textFieldMoneyOptions: ['currency', 'onKeyPress'],
    calendarOptions: ['initialViewDate', 'initialDate', 'initialStart', 'initialEnd', 'restriction', 'onReset'],
    stagesOptions: ['progress', 'scrollContainer'],
    bannerOptions: ['description'],
    loaderOptions: ['showDelay'],
    paginationOptions: ['showFirstLast', 'countPages', 'defaultPage', 'total', 'page', 'pageSize', 'onPageSizeChange', 'pageSizeOptions']
}

const componentsWithInterfaceExclusions = {
    Accordion: interfaceExclusions.accordionOptions,
    AccordionItem: interfaceExclusions.accordionItemOptions,
    AccordionSummary: interfaceExclusions.accordionSummaryOptions,
    AccordionHeading: interfaceExclusions.accordionSummaryOptions,
    Alert: interfaceExclusions.alertOptions,
    Anchor: interfaceExclusions.anchorOptions,
    Autocomplete: interfaceExclusions.autocompleteOptions,
    Banner: interfaceExclusions.bannerOptions,
    ButtonPrimary: interfaceExclusions.buttonOptions,
    ButtonSecondary: interfaceExclusions.buttonOptions,
    ButtonTertiary: interfaceExclusions.buttonOptions,
    ButtonTransparent: interfaceExclusions.buttonOptions,
    Calendar: interfaceExclusions.calendarOptions,
    CalendarMonthYear: interfaceExclusions.calendarOptions,
    CalendarQuarter: interfaceExclusions.calendarOptions,
    CalendarRange: interfaceExclusions.calendarOptions,
    Caption: interfaceExclusions.typographyOptions,
    Card: interfaceExclusions.cardOptions,
    Cell: interfaceExclusions.cellOptions,
    IconLoader: interfaceExclusions.iconOptions,
    Icon: interfaceExclusions.iconOptions,
    Headline1: interfaceExclusions.typographyOptions,
    Headline2: interfaceExclusions.typographyOptions,
    Headline3: interfaceExclusions.typographyOptions,
    Headline4: interfaceExclusions.typographyOptions,
    Headline5: interfaceExclusions.typographyOptions,
    HorizontalScroll: interfaceExclusions.horizontalScrollOptions,
    SegmentedHorizontalScroll: interfaceExclusions.segmentedHorizontalScrollOptions,
    Link: interfaceExclusions.linkOptions,
    Loader: interfaceExclusions.loaderOptions,
    Slider: interfaceExclusions.sliderOptions,
    Suggest: interfaceExclusions.suggestOptions,
    TableCell: interfaceExclusions.tableOptions,
    Tabs: interfaceExclusions.tabsOptions,
    Tab: interfaceExclusions.tabOptions,
    TimerCard: interfaceExclusions.timerCardOptions,
    Tip: interfaceExclusions.tooltipOptions,
    TextFieldLocalPhone: interfaceExclusions.localPhoneOptions,
    TextFieldMasked: interfaceExclusions.textFieldMaskedOptions,
    TextFieldMoney: interfaceExclusions.textFieldMoneyOptions,
    Menu: interfaceExclusions.menuOptions,
    MenuBlock: interfaceExclusions.menuOptions,
    MenuItem: interfaceExclusions.menuOptions,
    ValueOption: interfaceExclusions.valueSelectOptions,
    MarkdownFull: interfaceExclusions.markdownOptions,
    MarkdownShort: interfaceExclusions.markdownOptions,
    Stages: interfaceExclusions.stagesOptions,
    Pagination: interfaceExclusions.paginationOptions,
}

const isValidProp = (propName, componentExclusions = [], componentPropType) =>
    COMPLEX_TYPES.includes(propName) ||
    NAME_PATTERN.test(propName) ||
    componentExclusions.includes(propName) ||
    defaultPropTypes[propName] === componentPropType ||
    get(defaultPropTypes[propName], 'isRequired') === componentPropType

export const interfaceCheck = (exports) => {
    const warnList = []

    forEach(exports, (Component, name) => {
        forEach(Component.propTypes, (componentPropType, propName) => {
            if (
                !isValidProp(
                    propName,
                    componentsWithInterfaceExclusions[name],
                    componentPropType
                )
            ) {
                warnList.push(
                    `Prop ${propName} компонента ${
                        Component.displayName || Component.name
                    }`
                )
            }
        })
    })

    if (warnList.length) {
        fail(`Test Error: В следующих компонентах выявлено несоответствие архитектурному решению:
    ${warnList.join('\n    ')}`)
    }
}
