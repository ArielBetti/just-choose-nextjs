import { useRecoilState, useResetRecoilState } from "recoil";
import { useTheme } from "styled-components";
import { ObjectId } from "mongoose";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { MdCopyAll, MdDelete, MdFavorite, MdLink } from "react-icons/md";
import { atomFavorites } from "../../../store/atoms";
import { FlexBox, IconCard, MainCard } from "../../Atoms/atoms";
import { notificationPush } from "../../../helpers/notificationPush";
import ReactTooltip from "react-tooltip";
import { useRouter } from "next/router";
import { JUST_CHOOSE_BASE_URI } from "../../../utils/configs";

const FavoriteQuestions = () => {
  const theme = useTheme();
  const router = useRouter();

  // recoil: states
  const [favoriteQuestions, setFavoriteQuestions] =
    useRecoilState(atomFavorites);

  const onRemoveFavoriteQuestion = (questionId: ObjectId | string) => {
    if (Array.isArray(favoriteQuestions)) {
      const index = favoriteQuestions?.findIndex(
        (question) => question?.id === questionId
      );

      if (index > -1) {
        setFavoriteQuestions((prev) => {
          const newValue = [...prev];
          newValue.splice(index, 1);
          return newValue;
        });
        notificationPush("info", "Proposta removida dos favoritos");
      }
    }
  };

  const onGoToLink = (id: ObjectId | string): void => {
    router.push(`/question/${id}`);
  };

  return (
    <FlexBox
      direction="column"
      align="flex-start"
      justify="flex-start"
      width="md"
      gap="xs"
    >
      <h3>
        <MdFavorite /> Propostas Favoritas
      </h3>
      {favoriteQuestions?.length > 0 ? (
        favoriteQuestions.map((question) => (
          <MainCard
            key={question?.id}
            direction="row"
            align="center"
            justify="space-between"
            width="md"
            gap="sm"
          >
            <FlexBox
              direction="row"
              align="center"
              justify="flex-start"
              width="md"
              gap="sm"
            >
              <span>{question?.name}</span>
            </FlexBox>
            <FlexBox
              direction="row"
              align="center"
              justify="flex-end"
              width="md"
              gap="xxs"
            >
              <IconCard
                onClick={() => onGoToLink(question?.id)}
                data-tip="Ir para o link"
              >
                <MdLink size="16" />
              </IconCard>
              <CopyToClipboard
                text={`${JUST_CHOOSE_BASE_URI}${question?.url}`}
                onCopy={() =>
                  notificationPush(
                    "info",
                    "Link copiado para área de transferência"
                  )
                }
              >
                <IconCard data-tip="Copiar link">
                  <MdCopyAll size="16" />
                </IconCard>
              </CopyToClipboard>
              <IconCard
                data-tip="Remover dos favoritos"
                onClick={() => onRemoveFavoriteQuestion(question?.id)}
              >
                <MdDelete />
              </IconCard>
            </FlexBox>
          </MainCard>
        ))
      ) : (
        <MainCard
          direction="row"
          align="center"
          justify="space-between"
          width="md"
          gap="sm"
        >
          As propostas adicionadas aos favoritos aparecerão aqui.
        </MainCard>
      )}
      <ReactTooltip
        backgroundColor={theme?.font?.colors?.dark}
        textColor={theme?.font?.colors?.white}
      />
    </FlexBox>
  );
};

export default FavoriteQuestions;
