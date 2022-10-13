import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { requester } from "../../requester";
import { FlexBox, SkeletonContainer } from "../../components/Atoms/atoms";
import QuestionCard from "../../components/Molecules/QuestionCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IEndpointQuestion } from "../../interfaces";

const QuestionPage = () => {
  const [question, setQuestion] = useState<IEndpointQuestion>();

  const router = useRouter();
  const theme = useTheme();
  const { id } = router.query;

  const fetchQuestion = async () => {
    try {
      const { data }: any = await toast.promise(
        requester({}).get(`/api/question/${id}`),
        {
          pending: "Carregando proposta",
          error: "Ocoreu um erro em carregar essa proposta. 🤯",
        }
      );

      return setQuestion(data?.question);
    } catch (error) {
      return router.push("/");
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  return (
    <FlexBox direction="column" justify="center" align="center">
      <FlexBox direction="column" justify="center" align="center" width="sm">
        {!question ? (
          <SkeletonContainer>
            <SkeletonTheme
              baseColor={theme?.colors?.neutral?.pure}
              highlightColor={theme?.colors?.neutral?.[1]}
            >
              <Skeleton height={600} />
            </SkeletonTheme>
          </SkeletonContainer>
        ) : (
          <QuestionCard question={question} />
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default QuestionPage;
