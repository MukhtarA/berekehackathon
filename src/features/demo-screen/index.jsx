import React from 'react'
import { ScreenLayout } from '../../components/screen-layout'
import { ButtonPrimary,  Typography } from '../../components'
import {IconLoader} from '../../components/icon/icon-loader'

const DemoScreen = () => {
  return (
    <ScreenLayout>
        <ScreenLayout.Header title='Шапка' onClick={() => {console.log('test')}} />
        <ScreenLayout.Content>
            <IconLoader name='icon:core/common/ic24ArrowLeft' colorScheme='brandPrimary' />
            <Typography>Hello World!</Typography>
            <ButtonPrimary title='looool' colorScheme='brandPrimary' />
        </ScreenLayout.Content>
        </ScreenLayout>
  )
}

export default DemoScreen