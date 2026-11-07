import * as yup from "yup";

export const inviteUserConfirmFormSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

export type InviteUserConfirmFormData = yup.InferType<typeof inviteUserConfirmFormSchema>;