import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ScreenLayout } from "../../components/screen-layout";
import {ButtonPrimary, Typography} from "../../components";
import { Checkbox } from '@ozen-ui/kit/Checkbox';
import { DocumentIcon } from '@ozen-ui/icons';
import {Divider} from "@ozen-ui/kit/Divider";
import {MobileActions} from "../../utils/mobile-actions";
import DocsContext from "../context/docs";
import baseUrl from "../context/const";

const path = [
  { path: "/dummy", name: "Dummy" },
  { path: "/demo3", name: "Главная" },
  { path: "/demo2", name: "Мои расходы" },
];

const MainScreen = () => {
  const {docNumb, setDocNumb} = useContext(DocsContext);

  const router = useHistory();

  const handleClick = () => {
    router.push(`/docs-form`);
  };

  const handleGoBack = () => {
    MobileActions.exit()
  };

  const handleChecked = (currDoc) => {
    if (docNumb === null && docNumb === undefined) return false
    if (docNumb >= currDoc) {
      return true
    }

    return false
  };

  const docs = [
    {title: 'Анкета по учету персонала', isChecked: handleChecked(0)},
    {title: 'Форма по раскрытию конфликта интересов', isChecked: handleChecked(1)},
    {title:'Фото 3*4 - 1 шт', isChecked: handleChecked(2)},
    {title:'Документ удостоверяющего личность', isChecked: handleChecked(3)},
    {title:'Копия трудовой книжки/выписка из пенсионного фонда', isChecked: handleChecked(4)},
    {title:'Копии документов об Образовании', isChecked: handleChecked(5)},
    {title:'Справка о прохождении флюорографии за последний год', isChecked: handleChecked(6)},
    {title:'Документ с указанием адреса прописки, где видно ФИО', isChecked: handleChecked(7)}]

  return (
    <ScreenLayout>
      <ScreenLayout.Header title="Onboarding" onClick={handleGoBack} />
      <ScreenLayout.Content>
          {docs.map((item, index) => (
            <div key={index}>
              <div style={{ margin: index !== 0 ? '20px 0' : '10px 0 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DocumentIcon style={{ width: 20, marginRight: 10 }} size="s" color="var(--color-content-action)" />
                  <Typography>{item.title}</Typography>
                </div>
                {/* <Checkbox disabled checked={item.isChecked} /> */}
                <Checkbox
                  defaultChecked
                  size="m"
                  checked={item.isChecked}
                  disabled
                />
              </div>
              <Divider />
            </div>
          ))}
        </ScreenLayout.Content>
        <ScreenLayout.Footer>
          <ButtonPrimary
              style={{ marginBottom: 20, backgroundColor: '#379535', color: "white" }}
              onClick={handleClick}
              size="md"
              title={"Продолжить"}
              fullWidth
           />
        </ScreenLayout.Footer>

      </ScreenLayout>
  );
};

export default MainScreen;
