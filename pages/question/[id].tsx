import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { requester } from "../../requester";
import { FlexBox, SkeletonContainer } from "../../components/Atoms/atoms";
import QuestionCard from "../../components/Molecules/QuestionCard";

const QuestionPage = ({ question, __error }) => {
  const route = useRouter();
  const theme = useTheme();

  if (__error) return route.push("/");

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

export async function getServerSideProps({ params }) {
  try {
    const { data } = await requester({}).get(`/api/question/${params?.id}`);

    return { props: { question: data?.question } };
  } catch (error) {
    return { props: { question: {}, __error: error } };
  }
}

export default QuestionPage;
