import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@ozen-ui/kit/Button";
const path = [
  { path: "/dummy", name: "Dummy" },
  { path: "/demo3", name: "Главная" },
  { path: "/demo2", name: "Мои расходы" },
];

const DemoScreen = () => {
  const router = useHistory();

  const handleClick = ({ path }) => {
    router.push(path);
  };

  return (
    <div>
      {path.map(({ path, name }) => (
        <Button
          style={{ marginBottom: "6px" }}
          onClick={() => handleClick({ path })}
          size="2xs"
          fullWidth
        >
          {name}
        </Button>
      ))}
      <a href="https://ozen-ui.netlify.app/?path=/docs/%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F-%D0%B4%D0%BE%D0%B1%D1%80%D0%BE-%D0%BF%D0%BE%D0%B6%D0%B0%D0%BB%D0%BE%D0%B2%D0%B0%D1%82%D1%8C--%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F" target={'_blank'}>
      <Button
        style={{ marginBottom: "6px" }}
        onClick={() => console.log('clicked')}
        size="2xs"
        fullWidth
      >
        Ozen UI
      </Button>
      </a>
    </div>
  );
};

export default DemoScreen;
