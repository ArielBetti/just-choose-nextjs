import { useState } from "react";
import styled from "styled-components";
import Form from "../components/Molecules/Form";
import SharedLink from "../components/Molecules/SharedLink";
import { FlexBox } from "../components/Atoms/atoms";

const Index = () => {
  const [listLink, setListLink] = useState<string>("");

  const questionForm = {
    question: "",
  };

  const MainCard = styled(FlexBox)`
    background-color: ${(props) => props?.theme?.colors?.neutral?.pure};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    border-radius: 5px;
    padding: ${(props) => props?.theme?.spacing?.sm};
  `;

  return (
    <FlexBox direction="column" align="center" justify="flex-start">
      <MainCard
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
          <span>Faça sua proposta onde só pode haver uma resposta "Sim".</span>
          <span>Crie uma nova proposta e compartilhe com seus amigos.</span>
        </FlexBox>
        <Form questionForm={questionForm} setId={setListLink} />
        <SharedLink link={listLink} />
      </MainCard>
    </FlexBox>
  );
};

export default Index;
