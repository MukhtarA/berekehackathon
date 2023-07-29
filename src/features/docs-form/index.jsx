import React, {useCallback, useMemo, useState} from 'react'
import { ScreenLayout } from '../../components/screen-layout'
import {ButtonPrimary, HorizontalScroll, Typography} from '../../components'
import { Stepper, Step } from 'react-form-stepper';
import './style.css'
import PropTypes from "prop-types";
import one from '../../assets/docsImages/1.jpg'
import two from '../../assets/docsImages/2.jpg'
import tree from '../../assets/docsImages/3.jpg'
import four from '../../assets/docsImages/4.jpg'
import five from '../../assets/docsImages/5.jpg'
import six from '../../assets/docsImages/6.png'
import seven from '../../assets/docsImages/7.png'
import eight from '../../assets/docsImages/8.png'
import {useHistory} from "react-router-dom";

const DocsForm = () => {
    const router = useHistory();
    const [step, setStep] = useState(0)
    const [file, setFile] = useState(null)

    // activeBgColor: string;
    //     activeTextColor: string;
    //     completedBgColor: string;
    //     completedTextColor: string;
    //     inactiveBgColor: string;
    //     inactiveTextColor: string;

    const handleStep = useCallback(() => {
        if (step < 7){
            setStep((prev) => prev + 1)
            setFile('')
        }  else if (step === 7) {
            router.push('/docs-complete')
        }
    }, [step])

    const handleSubmitFile = useCallback((value) => {
        setFile(value.target.value)
    }, [])

    const filesAppearance = {
        0: one,
        1: two,
        2: tree,
        3: four,
        4: five,
        5: six,
        6: seven,
        7: eight
    }

    const fileNames = {
        0: 'Анкета по учету персонала',
        1: 'Форма о раскрытии конфликта интересов',
    }


    const renderImage = useMemo(() => <img style={{ width: '100%' }} src={filesAppearance[step]} alt={step} />, [step])

  return (
    <ScreenLayout>
        <ScreenLayout.Header title={fileNames[step]}/>
        <ScreenLayout.Content>
            <HorizontalScroll>
                <Stepper
                    style={{ padding: '20px 0' }}
                    activeStep={step}
                    connectorStateColors
                    steps={[{ label: '' }, { label: '' }, { label: '' },{ label: '' }, { label: '' }, { label: '' }, { label: '' }, { label: '' }]}
                    styleConfig={{
                        activeBgColor: '#379535',
                        activeTextColor: '#fff',
                        inactiveBgColor: 'lightgray',
                        inactiveTextColor: '#fff',
                        completedBgColor: '#379535',
                        completedTextColor: '#fff',
                        size: '2em'
                    }}
                />
            </HorizontalScroll>
            {renderImage}
        </ScreenLayout.Content>
        <ScreenLayout.Footer>
            {
                step !== 0 && step !== 1 &&
                <input type="file" id="file" value={file} onChange={(item) => setFile(item.target.value)}/>
            }
            <ButtonPrimary
                style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
                onClick={handleStep}
                title={"Продолжить"}
                fullWidth
                disabled={!file && step === 2}
            />
        </ScreenLayout.Footer>
        </ScreenLayout>
  )
}

export default DocsForm
