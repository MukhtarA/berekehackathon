import React, { useState } from "react";
import { ScreenLayout } from "../../components/screen-layout";
import { ButtonPrimary } from "../../components";
import { useHistory } from "react-router-dom";
import { Divider } from '@ozen-ui/kit/Divider';
import { Alert } from '@ozen-ui/kit/Alert';
import card from "../../assets/docsImages/card.png"
import {Checkbox} from "@ozen-ui/kit/Checkbox"
import {
    PlasticCardIcon,
    DeviceSuccessIcon,
    TengeIcon
 } from '@ozen-ui/icons';
import './get-card.css'

const GetCard = () => {
    const [confirm, setConfirm] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const cardIcon = () => (
        <PlasticCardIcon size="m" color="var(--color-content-primary)" />
      );

      const typeIcon = () => (
        <DeviceSuccessIcon size="m" color="var(--color-content-primary)" />
      );

      const currencyIcon = () => (
        <TengeIcon size="m" color="var(--color-content-primary)" />
      );

    const data = [
        {key: 1, name: 'Наименование карты', value: 'MC Digital ALL IN', icon: cardIcon()},
        {key: 2, name: 'Тип карты', value: 'Цифровая', icon: typeIcon()},
        {key: 3, name: 'Валюта', value: 'Тенге', icon: currencyIcon()}
    ];

    const router = useHistory();

    const handleCheck = (event) => {
        console.dir(event.target.checked);
        setConfirm(state => !state);
    }

    const handleStep = (event) => {
        event.preventDefault();
        if (confirm) {
            setErrorMessage('');
            router.push('/salary-accept');
        } else {
            setErrorMessage('Необходимо подтвердить согласие с условиями');
        }
    };

    return (
        <ScreenLayout>
            <ScreenLayout.Header
                colorScheme='primary'
                title='Открытие зарплатной карты'
            >
            </ScreenLayout.Header>
            <ScreenLayout.Content>
                <img style={{ width: '100%' }} src={card} alt='complete' />
                <div className="card-desc">
                    <div className="card-title">MC Digital ALL IN</div>
                    <div className="card-option">0 тенге за выпуск</div>
                </div>
                {data.map(item => {
                    return (
                        <div key={item.key}>
                            <div className="wrapper-desc">
                                <div className="left-desc">
                                    <div className="data-name">{item.name}</div>
                                    <div className="data-value">{item.value}</div>
                                </div>
                                <div style={{paddingTop: '5px'}}>
                                    {item.icon}
                                </div>
                            </div>
                            <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                height: '24px'
                            }}
                            >
                            <Divider
                                as="hr"
                                orientation="horizontal"
                                size="s"
                                style={{borderStyle: 'dashed'}}
                            />
                            </div>
                        </div>
                    )
                })}
                {
                    errorMessage &&
                    <>
                        <br />
                        <Alert
                            status="warning"
                            title="Внимание"
                        >
                            {errorMessage}
                        </Alert>
                    </>
                }
            </ScreenLayout.Content>
            <ScreenLayout.Footer>
                <Checkbox
                    label="Нажимая подтвердить, я соглашаюсь с условияси о выпуске новой карты"
                    size="xs"
                    checked={confirm}
                    onChange={handleCheck}
                />
                <ButtonPrimary
                    style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
                    onClick={handleStep}
                    title={"Продолжить"}
                    fullWidth
                />
            </ScreenLayout.Footer>
        </ScreenLayout>
    )
};

export default GetCard;
