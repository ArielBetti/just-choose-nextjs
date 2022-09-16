import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { mutate } from "swr";
import { notificationPush } from "../../../helpers/notificationPush";
import { requester } from "../../../requester";
import { FlexBox } from "../../Atoms/atoms";
import Button from "../../Atoms/Button";

// atom: components
import * as Atom from "./atoms";

// types
interface IbuttonScape {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

// ::
const QuestionCard = ({
  question,
}: {
  question: { question: string; answers: number };
}) => {
  const router = useRouter();
  const { id } = router.query;

  // states
  const [fakeQuestionAnsewrs, setFakeQuestionAnsewrs] = useState<number>(
    question?.answers || 0
  );
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [invertedButtons, setInvertedButtons] = useState<boolean>(false);
  const [buttonPosition, setButtonPosition] = useState<DOMRect>();
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [transformButtonAbsolute, setTransformButtonAbsolute] =
    useState<boolean>(false);

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
      const { data } = await requester({}).put(`/api/question/${id}`);

      setShowConfetti(true);
      notificationPush("success", "Resposta enviada com sucesso!");
      setFakeQuestionAnsewrs(fakeQuestionAnsewrs + 1);
      return mutate(`/api/question/${id}`, data, false);
    } catch (error) {
      return notificationPush("error", "Ocorreu um erro no envio da resposta.");
    }
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
    setFakeQuestionAnsewrs(question?.answers || 0);
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
        <Atom.AnswerBadge type="yes">
          <span>
            Sim: <strong>{fakeQuestionAnsewrs}</strong>
          </span>
        </Atom.AnswerBadge>
        <Atom.AnswerBadge type="no">
          <span>
            Não: <strong>0</strong>
          </span>
        </Atom.AnswerBadge>
      </Atom.BadgesContainer>
      <Atom.Card onMouseMove={(event: any) => observeMousemose(event)}>
        <FlexBox justify="center" align="center" direction="row">
          <Atom.Question>
            <h6>{question?.question}</h6>
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
    </FlexBox>
  );
};

export default QuestionCard;
