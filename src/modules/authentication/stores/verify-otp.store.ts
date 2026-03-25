import { create } from "zustand";

type TVerifyOtpState = {
  resendAfter: number;
};

type TVerifyOtpAction = {
  setSecondsToResend: (
    nextSecondsToResend:
      | TVerifyOtpState["resendAfter"]
      | ((
          currentVal: TVerifyOtpState["resendAfter"],
        ) => TVerifyOtpState["resendAfter"]),
  ) => void;
};

type VerifyOtpStore = TVerifyOtpState & TVerifyOtpAction;

const useVerifyOtpStore = create<VerifyOtpStore>()((set) => ({
  resendAfter: 0,
  setSecondsToResend(nextCountdown) {
    set((state) => ({
      resendAfter:
        typeof nextCountdown === "function"
          ? nextCountdown(state.resendAfter)
          : nextCountdown,
    }));
  },
}));

export default useVerifyOtpStore;
