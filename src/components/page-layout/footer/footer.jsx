import React from 'react'

import { Grid, Cell } from '../../grid'
import Address from './address'
import Socials from './socials'
import { FooterStyled } from './footer.style'

export default () => (
    <FooterStyled>
        <Grid>
            <Cell lg={34} md={24} sm={23}>
                <Address />
            </Cell>
            <Cell lg={24} md={14} sm={23}>
                <Socials />
            </Cell>
        </Grid>
    </FooterStyled>
)
