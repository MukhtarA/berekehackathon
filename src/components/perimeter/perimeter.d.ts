import React from 'react'

import { OnClickHTMLElement } from '../..'

export interface PerimeterProps {
    onClickOutside?: OnClickHTMLElement;
    disableOnClickOutside?: OnClickHTMLElement | boolean;
    children?: React.ReactNode;
}

export class Perimeter extends React.PureComponent<PerimeterProps, unknown> {
    public render (): React.ReactNode;
}
