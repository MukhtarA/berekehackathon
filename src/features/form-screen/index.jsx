import React from 'react'
import { ScreenLayout } from '../../components/screen-layout'
import { ButtonPrimary,  Typography } from '../../components'
import { Form, Formik } from 'formik'
import {IconLoader} from '../../components/icon/icon-loader'

const DemoScreen = () => {
  return (
    <ScreenLayout>
        <ScreenLayout.Header title='Форма' onClick={() => {console.log('test')}} />
        <ScreenLayout.Content>
            <Typography>Hello World!</Typography>
            <ButtonPrimary title='looool' colorScheme='brandPrimary' />
        </ScreenLayout.Content>
        </ScreenLayout>
  )
}

export default DemoScreen