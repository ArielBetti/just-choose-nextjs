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

// ::
const Form = ({
  questionForm,
  setId,
}: {
  questionForm: { question: string };
  setId: Dispatch<SetStateAction<string>>;
}) => {
  const [form, setForm] = useState({
    question: questionForm?.question,
  });
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");

  const postData = async (form) => {
    try {
      const { data } = await requester({}).post("/api/question", form);

      setMessage("");
      setError("");

      notificationPush("success", "Proposta cadastrada com sucesso!")
      return setId(`${JUST_CHOOSE_BASE_URI}/question/${data?.question?._id}`);
    } catch (error) {
      notificationPush("error", "Ocoreu um erro no cadastro da proposta.")
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
