import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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
          <span>Faça sua proposta onde só pode haver uma resposta "Sim".</span>
          <span>Crie uma nova proposta e compartilhe com seus amigos.</span>
        </FlexBox>
        <Form questionForm={questionForm} setId={setListLink} />
        <SharedLink link={listLink} />
        <h2>Apoie o criador:</h2>
        <FlexBox
          direction="row"
          align="flex-start"
          justify="flex-start"
          gap="sm"
        >
          <a target="_blank" href="https://github.com/ArielBetti">
            <FaGithub cursor="pointer" size="30px" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/ariel-betti/">
            <FaLinkedinIn cursor="pointer" size="30px" />
          </a>
          <a target="_blank" href="https://www.youtube.com/channel/UCXCyTeW1V33Ki4PyMLCn2zg">
            <FaYoutube cursor="pointer" size="30px" />
          </a>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Index;
