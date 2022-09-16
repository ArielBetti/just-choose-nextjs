import { useState } from "react";
import Form from "../components/Molecules/Form";
import SharedLink from "../components/Molecules/SharedLink";
import { FlexBox } from "../components/Atoms/atoms";

const Index = () => {
  const [listLink, setListLink] = useState<string>("");

  const questionForm = {
    question: "",
  };

  return (
    <FlexBox direction="column" align="center" justify="flex-start">
      <FlexBox
        direction="column"
        align="flex-start"
        justify="center"
        width="md"
        gap="sm"
      >
        <h1>Just Choose?</h1>
        <FlexBox
          direction="column"
          align="flex-start"
          justify="center"
          gap="xxs"
        >
          <span>Faça sua pergunta onde só pode haver uma resposta "Sim".</span>
          <span>Crie uma nova pergunta e compartilhe com seus amigos.</span>
        </FlexBox>
        <Form questionForm={questionForm} setId={setListLink} />
        <SharedLink link={listLink} />
      </FlexBox>
    </FlexBox>
  );
};

export default Index;
