import React from 'react'
import { ScreenLayout } from '../../components/screen-layout'
import styled from '@emotion/styled'
import { Accordion, Typography, AccordionSummary,
    AccordionItem,
    AccordionContent, 
    Alert,
    AlertTitle,
    Divider,
    Banner,
    ButtonPrimary,
    ButtonSecondary,
    ButtonTransparent,
    ButtonDashed,
    Calendar,
    Card,
    TextField,
    SelectionGroup,
    Radio,
} from '../../components'
import BottomTabs from '../../components/screen-layout/bottom-tabs'
import { Form, Formik } from 'formik'
import {IconLoader} from '../../components/icon/icon-loader'
import _ from 'lodash'


export const MENU = [
    {
        title: 'billboard.name',
        iconName: 'icon:core/common/ic36Star',
        url: '/'
    },
    {
        title: 'catalog',
        iconName: 'icon:core/common/ic36List',
        url: '/catalog'
    },
    {
        title: 'myTickets',
        iconName: 'icon:billboard/ticket',
        url: '/my-tickets'
    }
]

const ComponentsScreen = () => {
  return (
    <ScreenLayout>
        <ScreenLayout.Header title='Компоненты' onClick={() => {console.log('test')}} />
        <ScreenLayout.Content>
        <Accordion verticalPadding="zero" collapsible size="h3">
                    <AccordionItem id={_.uniqueId()}>
                        <AccordionSummary title={'Accordion Titile'} description={'Accordion description'} />
                        <AccordionContent>
                            <Typography> 
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, quod ducimus! Laudantium veniam ad minima deserunt consectetur officiis voluptas nobis, magnam aperiam voluptate dolorem quia expedita culpa. Quasi, suscipit fugit!
                            </Typography>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Divider />
                <Alert mode="warning">
                            <AlertTitle>{'Клиент не найден'}</AlertTitle>
                        </Alert>
                        <Alert mode="success">
                            <AlertTitle>{'Клиент не найден'}</AlertTitle>
                        </Alert>
                        <Alert mode="">
                            <AlertTitle>{'Клиент не найден'}</AlertTitle>
                        </Alert>
                    <Divider />
                    <Banner title='Banner Title' description='Banner description' imageSrc='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' />
                    <Divider />
                    <ButtonPrimary title='Primary Button' onClick={() => alert('you clicked the button ')}/>
                    <ButtonSecondary title='Primary Button' onClick={() => alert('you clicked the button ')}/>
                    <ButtonTransparent title='Primary Button' onClick={() => alert('you clicked the button ')}/>
                    <ButtonDashed title='Primary Button' onClick={() => alert('you clicked the button ')}/>
                    <Divider />
                    <Calendar />
                    <Divider />
                    <Card title='This is card' />
                    <Divider />
                    <TextField title='TextField Title' />    
                    <Divider />
                    <SelectionGroup size="lg">
                        <Radio
                            name={"Radio1"}
                            checked={true}
                            size="md"
                            verticalMargin="inner"
                            onChange={() => console.log('smth')}
                            value={"Radio1"}
                        >
                           Radio1
                        </Radio>
                       
                        <Radio
                            name={'Radio2'}
                            checked={false}
                            size="md"
                            verticalMargin="inner"
                            onChange={() => console.log('smth')}
                            value={"Radio2"}
                        >
                          Radio2
                        </Radio>
                    </SelectionGroup>            
                    <ScreenLayout.BottomTabs fullWidth>
                    <ScreenLayout.BottomTab
                    to="/"
                    exact
                    iconName="icon:ticketon/films"
                    title={'Title1'}
                />
                <ScreenLayout.BottomTab
                    to="/cinemas"
                    exact
                    iconName="icon:ticketon/cinemas"
                    title={'Title12'}
                />

                <ScreenLayout.BottomTab
                    to="/my-tickets"
                    exact
                    iconName="icon:ticketon/ticket"
                    title={'Title12'}
                />
                         </ScreenLayout.BottomTabs>
        </ScreenLayout.Content>
        </ScreenLayout>
  )
}

export default ComponentsScreen

