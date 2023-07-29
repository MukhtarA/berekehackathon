import React, {useState} from "react";
import {ScreenLayout} from "../../components/screen-layout";
import {ButtonPrimary} from "../../components";
import docSign from '../../assets/docsImages/docSign.png'
import {useHistory} from "react-router-dom";
import {Typography} from "@ozen-ui/kit/Typography";
import {Checkbox} from "@ozen-ui/kit/Checkbox"
import {DocumentIcon} from "@ozen-ui/icons";
import {Divider} from "@ozen-ui/kit/Divider";
import {Alert} from "@ozen-ui/kit/Alert";

const DocSign = () => {
    const router = useHistory();

    const [agreement, setAgreement] = useState(false)
    const [instruction, setInstruction] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const docs = [{title:'Трудовой Договор', isChecked: false, id: 1}, {title: 'Должностная Инструкция', isChecked: false, id: 2}]

    const handleCheck = (id) => {
        if (id === 1){
            setAgreement(prev => !prev);
        } else {
            setInstruction(prev => !prev)
        }
    }

    const handleStep = () => {
        if (agreement && instruction) {
            setErrorMessage('');
            router.push('/offer-acceptance');
        } else {
            setErrorMessage('Необходимо подтвердить согласие с условиями');
        }
    };

    return (
        <ScreenLayout>
            <ScreenLayout.Header title="Подписание документов" />
            <ScreenLayout.Content>
                <img style={{ width: 150, height: 150, objectFit: 'contain', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                     src={docSign}
                     alt='docSign' />
                <Typography variant="text-xl" style={{ textAlign: 'center', margin: '50px 0' }}>
                    Для завершения процесса оформления необходимо ознакомиться и подписать
                </Typography>
                {docs.map((item, index) => (
                    <div>
                        <div style={{ margin: index !== 0 ? '20px 0' : '10px 0 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <DocumentIcon style={{ width: 20, marginRight: 10 }} size="s" color="var(--color-content-action)" />
                                <Typography>{item.title}</Typography>
                            </div>
                            <Checkbox
                                label=""
                                size="xs"
                                onChange={() => handleCheck(item.id)}
                            />
                        </div>
                        <Divider />
                    </div>
                ))}
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
                {/*<Checkbox*/}
                {/*    label="Я ознакомлен(-а) с документами"*/}
                {/*    size="xs"*/}
                {/*/>*/}
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

export default DocSign

