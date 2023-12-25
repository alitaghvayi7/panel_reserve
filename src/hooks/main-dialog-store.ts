import { create } from "zustand";
export type State = {
  formType: "normal" | "forgetPassword" | "confirmOTP";
  additionalData?: {
    phoneNumber?: string;
  };
};
type Action = {
  setFormType: (formType: State) => void;
};

export const useFormTypeStore = create<State & Action>((set) => ({
  formType: "normal",
  additionalData: {},
  setFormType({ formType, additionalData }: State) {
    additionalData
      ? set({
          formType,
          additionalData,
        })
      : set({
          formType,
        });
  },
}));
