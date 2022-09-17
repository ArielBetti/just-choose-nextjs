import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Form from "../components/Molecules/Form";
import SharedLink from "../components/Molecules/SharedLink";
import { FlexBox, MainCard } from "../components/Atoms/atoms";
import { atomNewQuestion } from "../store/atoms";
import FavoriteQuestions from "../components/Molecules/FavoriteQuestions";

const Index = () => {
  // local: states
  const setNewQuestion = useSetRecoilState(atomNewQuestion);

  const questionForm = {
    question: "",
  };

  return (
    <FlexBox direction="column" align="center" justify="flex-start" gap="xs">
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
        <Form questionForm={questionForm} setId={setNewQuestion} />
        <SharedLink />
      </MainCard>
      <FavoriteQuestions />
    </FlexBox>
  );
};

export default Index;
