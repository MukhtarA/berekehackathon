import React, { useState } from "react";
import { ScreenLayout } from "../../components/screen-layout";
import { SectionMessage } from '@ozen-ui/kit/SectionMessage';
import LabeledInput from "../../components/inputs/labeled-input";
import { Alert } from '@ozen-ui/kit/Alert';
import { ButtonPrimary } from "../../components";
import { useHistory } from "react-router-dom";
import baseUrl from "../context/const";

const SetPassword = () => {
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useHistory();

    const handleStep = (event) => {
        event.preventDefault();
        if (!pass || !confirmPass) {
            setErrorMessage('Необъходимо заполнить оба поля');
        } else if (pass.length < 6) {
            setErrorMessage('Пароль должен быть не менее 6 символов');
        } else if (pass !== confirmPass) {
            setErrorMessage('Пароль и подтверждение пароля не совпадают');
        } else {
            setErrorMessage('');
            router.push(`${baseUrl}/get-card`);
        }
    };

    return (
        <ScreenLayout>
            <ScreenLayout.Header
                colorScheme='primary'
                title='Создание пароля'
            >
            </ScreenLayout.Header>
            <ScreenLayout.Content>
                <SectionMessage
                    size="m"
                    status="neutral"
                    title="Дополнительная информация"
                    >
                    Указанный вами пароль создается для SmartCard и будет использоваться для входа в ИС Банка
                </SectionMessage>
                <LabeledInput
                    type="password"
                    name="password"
                    label='Ваш пароль'
                    value={pass}
                    onChange={(event) => setPass(event)}
                />
                <LabeledInput
                    type="password"
                    name="password-confirmed"
                    label='Потвердите пароль'
                    value={confirmPass}
                    onChange={(event) => setConfirmPass(event)}
                />
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

export default SetPassword;
