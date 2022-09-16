import { toast } from "react-toastify";
import { TypeOptions } from "react-toastify/dist/types";

export const notificationPush = (type: TypeOptions, message: string) =>
  toast?.[type](message);
