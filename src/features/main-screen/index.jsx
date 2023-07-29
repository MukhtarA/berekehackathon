import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@ozen-ui/kit/Button";
import { ScreenLayout } from "../../components/screen-layout";
import {ButtonPrimary, Checkbox, Typography} from "../../components";
import { DocumentIcon } from '@ozen-ui/icons';
import {ScreenDivider} from "../../components/screen-divider";
import {Divider} from "@ozen-ui/kit/Divider";
import {MobileActions} from "../../utils/mobile-actions";

const path = [
  { path: "/dummy", name: "Dummy" },
  { path: "/demo3", name: "Главная" },
  { path: "/demo2", name: "Мои расходы" },
];

const MainScreen = () => {
  const router = useHistory();

  const handleClick = () => {
    router.push('/docs-form');
  };

  const handleGoBack = () => {
    MobileActions.exit()
  }

  const docs = [
    {title: 'Анкета по учету персонала', isChecked: false},
    {title: 'Форма по раскрытию конфликта интересов', isChecked: false},
    {title:'Фото 3*4 - 1 шт', isChecked: false},
    {title:'Документ удостоверяющего личность', isChecked: false},
    {title:'Копия трудовой книжки/выписка из пенсионного фонда', isChecked: false},
    {title:'Копии документов об Образовании', isChecked: false},
    {title:'Справка о прохождении флюорографии за последний год', isChecked: false},
    {title:'Документ с указанием адреса прописки, где видно ФИО', isChecked: false}]

  return (
    <ScreenLayout>
      <ScreenLayout.Header title="Onboarding" onClick={handleGoBack} />
      <ScreenLayout.Content>
          {docs.map((item, index) => (
            <div>
              <div style={{ margin: index !== 0 ? '20px 0' : '10px 0 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DocumentIcon style={{ width: 20, marginRight: 10 }} size="s" color="var(--color-content-action)" />
                  <Typography>{item.title}</Typography>
                </div>
                <Checkbox disabled checked={item.isChecked} />
              </div>
              <Divider />
            </div>
          ))}
        </ScreenLayout.Content>
        <ScreenLayout.Footer>
          <ButtonPrimary
              style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
              onClick={handleClick}
              size="2xs"
              title={"Продолжить"}
              fullWidth
           />
        </ScreenLayout.Footer>

      </ScreenLayout>
  );
};

export default MainScreen;
