import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useTheme } from "styled-components";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { ObjectId } from "mongoose";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

import { onAddFavorites } from "../../../helpers/addOnFavorites";
import { requester } from "../../../requester";
import { atomFavorites } from "../../../store/atoms";
import { FlexBox, IconCard } from "../../Atoms/atoms";
import Button from "../../Atoms/Button";

// atom: components
import * as Atom from "./atoms";
import { MdFavorite } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import { IEndpointQuestion } from "../../../interfaces";

// types
interface IbuttonScape {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

// ::
const QuestionCard = ({ question }: { question: IEndpointQuestion }) => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = router.query;

  // states
  const [fakeQuestionAnswers, setFakeQuestionAnswers] = useState<number>(
    question?.answers || 0
  );
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [invertedButtons, setInvertedButtons] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<DOMRect>();
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [transformButtonAbsolute, setTransformButtonAbsolute] =
    useState<boolean>(false);

  // recoil: states
  const [favoriteQuestions, setFavoriteQuestions] =
    useRecoilState(atomFavorites);

  const [buttonScape, setButtonScape] = useState<IbuttonScape>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  const elementRef = useRef<HTMLButtonElement>(null);

  const { width, height } = useWindowSize();

  const calculeMouseDistance = (
    element: DOMRect,
    mouseX: number,
    mouseY: number
  ): number => {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (element?.left + element?.width / 2), 2) +
          Math.pow(mouseY - (element.top + element.height / 2), 2)
      )
    );
  };

  const cursorDistance: number = useMemo(() => {
    if (buttonPosition?.x && buttonPosition?.y) {
      return calculeMouseDistance(buttonPosition, mouseX, mouseY);
    }

    return 0;
  }, [buttonPosition, mouseY, mouseX]);

  const observeMousemose = (event: MouseEvent) => {
    setMouseX(event?.clientX);
    setMouseY(event?.clientY);
  };

  const activeScape = useCallback(() => {
    setButtonScape((prevState) => ({
      ...prevState,
      right: Math.floor(Math.random() * 80),
      left: Math.floor(Math.random() * 80),
      top: Math.floor(Math.random() * 80),
      bottom: Math.floor(Math.random() * 80),
    }));

    setTransformButtonAbsolute(true);
  }, []);

  const handleInvertedButtons = () => {
    if (!invertedButtons) {
      setInvertedButtons(true);
    } else {
      activeScape();
    }
  };

  const sendAnswer = async (id) => {
    try {
      const { data }: any = await toast.promise(
        requester({}).put(`/api/question/${id}`),
        {
          pending: "Enviando resposta",
          success: "Resposta enviada com sucesso! 👌",
          error: "Ocorreu um erro no envio da resposta. 🤯",
        }
      );

      setShowConfetti(true);
      setFakeQuestionAnswers(fakeQuestionAnswers + 1);
      return mutate(`/api/question/${id}`, data, false);
    } catch (error) {
      return;
    }
  };

  const addFavoriteQuestion = () => {
    onAddFavorites(
      question._id,
      {
        id: question?._id,
        name: question?.question,
        url: `/question/${question?._id}`,
      },
      favoriteQuestions,
      setFavoriteQuestions
    );
  };

  useEffect(() => {
    setButtonPosition(elementRef?.current?.getBoundingClientRect());
  }, [elementRef, buttonScape]);

  useEffect(() => {
    if (buttonPosition?.x && cursorDistance <= 70 && invertedButtons) {
      activeScape();
    }
  }, [
    activeScape,
    cursorDistance,
    buttonPosition,
    buttonScape,
    mouseX,
    mouseY,
    invertedButtons,
  ]);

  useEffect(() => {
    setFakeQuestionAnswers(question?.answers || 0);
  }, [question]);

  return (
    <FlexBox justify="center" align="flex-start" direction="column">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={800}
          tweenDuration={15000}
          gravity={0.15}
          style={{ zIndex: 10 }}
        />
      )}
      <Atom.BadgesContainer
        gap="xxs"
        justify="flex-start"
        align="center"
        direction="row"
      >
        <FlexBox gap="xxs" justify="flex-start" align="center" direction="row">
          <Atom.AnswerBadge type="yes">
            <span>
              Sim: <strong>{fakeQuestionAnswers}</strong>
            </span>
          </Atom.AnswerBadge>
          <Atom.AnswerBadge type="no">
            <span>
              Não: <strong>0</strong>
            </span>
          </Atom.AnswerBadge>
        </FlexBox>
        <IconCard
          onClick={() => addFavoriteQuestion()}
          data-tip="Adicionar aos favoritos"
        >
          <MdFavorite />
        </IconCard>
      </Atom.BadgesContainer>
      <Atom.Card onMouseMove={(event: any) => observeMousemose(event)}>
        <FlexBox justify="center" align="center" direction="row">
          <Atom.Question>
            <Atom.QuestionTitle>{question?.question}</Atom.QuestionTitle>
          </Atom.Question>
        </FlexBox>
        <FlexBox justify="space-evenly" align="center" direction="row">
          <Button onClick={() => sendAnswer(id)}>Sim</Button>
          <Atom.ButtonPosition
            left={buttonScape?.left}
            top={buttonScape?.top}
            right={buttonScape?.right}
            bottom={buttonScape?.bottom}
            transformButton={transformButtonAbsolute}
            scapeActive={invertedButtons}
            ref={elementRef}
          >
            <Button onClick={() => handleInvertedButtons()}>Não</Button>
          </Atom.ButtonPosition>
        </FlexBox>
      </Atom.Card>
      <ReactTooltip
        backgroundColor={theme?.font?.colors?.dark}
        textColor={theme?.font?.colors?.white}
      />
    </FlexBox>
  );
};

export default QuestionCard;
