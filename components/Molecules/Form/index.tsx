import { Dispatch, SetStateAction, useState } from "react";

// api: requester
import { requester } from "../../../requester";

// icons
import { MdAdd } from "react-icons/md";

// atoms
import { FlexBox } from "../../Atoms/atoms";
import Button from "../../Atoms/Button";
import Input from "../../Atoms/Input";
import { JUST_CHOOSE_BASE_URI } from "../../../utils/configs";
import { notificationPush } from "../../../helpers/notificationPush";
import { IQuestion } from "../../../interfaces";
import { toast } from "react-toastify";

// ::
const Form = ({
  questionForm,
  setId,
}: {
  questionForm: { question: string };
  setId: Dispatch<SetStateAction<IQuestion>>;
}) => {
  const [form, setForm] = useState({
    question: questionForm?.question,
  });
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");

  const postData = async (form) => {
    try {
      const { data }: any = await toast.promise(
        requester({}).post("/api/question", form),
        {
          pending: "Enviando proposta",
          success: "Proposta cadastrada com sucesso! 👌",
          error: "Ocoreu um erro no cadastro da proposta. 🤯",
        }
      );

      setMessage("");
      setError("");
      return setId({
        id: data?.question?._id,
        name: data?.question?.question,
        url: `/question/${data?.question?._id}`,
      });
    } catch (error) {
      return setMessage("Ocorreu um erro, tente novamente.");
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;

    setError("");
    setForm({ question: value });
  };

  const validateErrors = () => {
    if (!form?.question) return "Digite uma proposta.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateErrors();
    if (!errs) {
      postData(form);
    } else {
      setError(errs);
    }
  };

  return (
    <FlexBox direction="column" justify="center" align="flex-start" gap="sm">
      <Input
        onChange={(e) => handleChange(e)}
        label="Proposta"
        placeholder="Digite sua proposta de uma resposta"
      />
      <span>{form?.question?.length}/70</span>
      {error}
      {message}
      <Button onClick={(e) => handleSubmit(e)}>
        <MdAdd />
        Criar
      </Button>
    </FlexBox>
  );
};

export default Form;
