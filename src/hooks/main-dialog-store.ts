import { create } from "zustand";
export type State = {
  formType: "normal" | "forgetPassword" | "confirmOTP";
};
type Action = {
  setFormType: (formType: State) => void;
};

export const useFormTypeStore = create<State & Action>((set) => ({
  formType: "normal",
  setFormType({ formType }: State) {
    set({
      formType,
    });
  },
}));
