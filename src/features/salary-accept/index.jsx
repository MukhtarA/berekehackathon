import React, {useState} from "react";
import {ScreenLayout} from "../../components/screen-layout";
import {ButtonPrimary} from "../../components";
import salaryAccept from '../../assets/docsImages/salaryAccept.png'
import {useHistory} from "react-router-dom";
import {Typography} from "@ozen-ui/kit/Typography";
import {Checkbox} from "@ozen-ui/kit/Checkbox"
import {DocumentIcon} from "@ozen-ui/icons";
import {Divider} from "@ozen-ui/kit/Divider";
import {Alert} from "@ozen-ui/kit/Alert";

const SalaryAccept = () => {
    const router = useHistory();
    const [confirm, setConfirm] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const docs = [{title:'Трудовой Договор', isChecked: false}, {title: 'Должностная Инструкция', isChecked: false}]

    const handleCheck = (event) => {
        console.dir(event.target.checked);
        setConfirm(state => !state);
    }

    const handleStep = (event) => {
        event.preventDefault();
        if (confirm) {
            setErrorMessage('');
            router.push('/doc-sign');
        } else {
            setErrorMessage('Необходимо подтвердить согласие с условиями');
        }
    };
    return (
        <ScreenLayout>
            <ScreenLayout.Header title="Заявление на зачисление заработной платы" />
            <ScreenLayout.Content>
                <img style={{ width: 150, height: 150, objectFit: 'contain', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                     src={salaryAccept}
                     alt='salaryAccept' />
                <Typography variant="text-xl" style={{ textAlign: 'center', margin: '20px 0' }}>
                    Карта успешно открыта!
                </Typography>
                <Divider/>
                <Typography variant="text-xl" style={{ textAlign: 'center', margin: '20px 0' }}>
                    Подпишите заявление на зачисление зарплаты
                </Typography>

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
                    label="Ознакомлен(-а) с Заявлением на зачисление зарплаты"
                    size="xs"
                    checked={confirm}
                    onChange={handleCheck}
                />
                <ButtonPrimary
                    style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
                    onClick={handleStep}
                    title={"Подписать"}
                    fullWidth
                />
            </ScreenLayout.Footer>
        </ScreenLayout>
    )
}

export default SalaryAccept

