import React, {useCallback, useMemo, useState} from "react";
import {ScreenLayout} from "../../components/screen-layout";
import {ButtonPrimary, HorizontalScroll} from "../../components";
import Lottie from 'react-lottie';
import {useHistory} from "react-router-dom";
import animationData from '../../assets/animationData.json'
import {Typography} from "@ozen-ui/kit/Typography";

const OfferAcceptance = () => {
    const router = useHistory();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <ScreenLayout>
            <ScreenLayout.Header/>
            <ScreenLayout.Content>
                <Lottie
                    options={defaultOptions}
                    height={400}
                    width={'100%'}
                />
                <Typography variant="heading-xl" style={{ textAlign: 'center' }}>
                    Добро пожаловать в Bereke Bank!
                    Вы стали частью большой команды!
                </Typography>
            </ScreenLayout.Content>
        </ScreenLayout>
    )
}

export default OfferAcceptance

