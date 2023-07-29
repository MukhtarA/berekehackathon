import React from "react";
import {ScreenLayout} from "../../components/screen-layout";
import {ButtonPrimary} from "../../components";
import complete from '../../assets/docsImages/completeDoc.jpg'
import {useHistory} from "react-router-dom";

const DocsComplete = () => {
    const router = useHistory();

    return (
        <ScreenLayout>
            <ScreenLayout.Header/>
            <ScreenLayout.Content style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ width: '100%' }} src={complete} alt='complete' />
            </ScreenLayout.Content>
            <ScreenLayout.Footer>
                <ButtonPrimary
                    style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
                    onClick={() => router.push('/set-password')}
                    title={"Продолжить"}
                    fullWidth
                />
            </ScreenLayout.Footer>
        </ScreenLayout>
    )
}

export default DocsComplete

