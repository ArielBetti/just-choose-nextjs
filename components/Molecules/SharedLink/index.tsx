import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { useTheme, DefaultTheme } from "styled-components";

// icons
import { MdCopyAll, MdLink } from "react-icons/md";

// atoms
import * as Atom from "./atoms";
import { FlexBox } from "../../Atoms/atoms";
import Input from "../../Atoms/Input";
import { JUST_CHOOSE_BASE_URI } from "../../../utils/configs";
import { notificationPush } from "../../../helpers/notificationPush";

// ::
const SharedLink = ({ link }: { link: string }) => {
  const router = useRouter();
  const theme: DefaultTheme = useTheme();

  const onGoToLink = (): void => {
    if (link) {
      const linkRouter = link.replace(JUST_CHOOSE_BASE_URI, "");
      router.push(linkRouter);
    }
  };

  return (
    <>
      <FlexBox direction="row" justify="flex-start" align="center" gap="xxs">
        <Input
          value={link || ""}
          placeholder="Seu link será apresentado aqui."
          readOnly
        />
        <Atom.IconCard onClick={() => onGoToLink()} data-tip="Ir para o link">
          <MdLink size="16" />
        </Atom.IconCard>
        <CopyToClipboard
          text={link}
          onCopy={() =>
            notificationPush("info", "Link copiado para área de transferência")
          }
        >
          <Atom.IconCard data-tip="Copiar link">
            <MdCopyAll size="16" />
          </Atom.IconCard>
        </CopyToClipboard>
      </FlexBox>
      <ReactTooltip backgroundColor={theme?.font?.colors?.dark} textColor={theme?.font?.colors?.white} />
    </>
  );
};

export default SharedLink;
