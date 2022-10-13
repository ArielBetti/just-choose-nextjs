import { useMemo } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useTheme, DefaultTheme } from "styled-components";

// icons
import { MdCopyAll, MdFavorite, MdLink } from "react-icons/md";

// atoms
import { IconCard } from "../../Atoms/atoms";
import { FlexBox } from "../../Atoms/atoms";
import Input from "../../Atoms/Input";

import { notificationPush } from "../../../helpers/notificationPush";
import { atomFavorites, atomNewQuestion } from "../../../store/atoms";
import { onAddFavorites } from "../../../helpers/addOnFavorites";
import { JUST_CHOOSE_BASE_URI } from "../../../utils/configs";

// ::
const SharedLink = () => {
  const router = useRouter();
  const theme: DefaultTheme = useTheme();

  // recoil: states
  const question = useRecoilValue(atomNewQuestion);
  const [favoriteQuestions, setFavoriteQuestions] =
    useRecoilState(atomFavorites);

  const questionSharedUrl = useMemo(() => {
    if (question?.url) {
      return `${JUST_CHOOSE_BASE_URI}${question?.url}`;
    }
    return "";
  }, [question]);

  const onGoToLink = (): void => {
    if (question?.url) {
      router.push(question.url);
    }
  };

  const addFavorite = () => {
    if (question?.id) {
      onAddFavorites(
        question?.id,
        question,
        favoriteQuestions,
        setFavoriteQuestions
      );
    }
  };

  return (
    <>
      <FlexBox direction="row" justify="flex-start" align="center" gap="xxs">
        <Input
          value={questionSharedUrl}
          placeholder="Seu link será apresentado aqui."
          readOnly
        />
        <IconCard onClick={() => onGoToLink()} data-tip="Ir para o link">
          <MdLink size="16" />
        </IconCard>
        <CopyToClipboard
          text={questionSharedUrl}
          onCopy={() =>
            notificationPush("info", "Link copiado para área de transferência")
          }
        >
          <IconCard data-tip="Copiar link">
            <MdCopyAll size="16" />
          </IconCard>
        </CopyToClipboard>
        <IconCard
          onClick={() => addFavorite()}
          data-tip="Adicionar proposta aos favoritos"
        >
          <MdFavorite size="16" />
        </IconCard>
      </FlexBox>
      <ReactTooltip
        backgroundColor={theme?.font?.colors?.dark}
        textColor={theme?.font?.colors?.white}
      />
    </>
  );
};

export default SharedLink;
