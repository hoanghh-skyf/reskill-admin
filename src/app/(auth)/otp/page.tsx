import { redirect } from "next/navigation";
import { verifyTokenAction } from "@/modules/authentication/actions.server";
import OTPValidationForm from "@/modules/authentication/ui/otp-validation-form";
import { MobileActionOTPCodeIcon } from "@/shared/components/icons";
import AuthLayout from "@/shared/components/layouts/auth-layout";
import { APP_ROUTERS, EResponseStatus, ETokenType } from "@/shared/constants";
import { simpleDecode } from "@/shared/lib/utils";

const VerificationOTPPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) => {
  const { token } = await searchParams;

  if (!token) {
    redirect(APP_ROUTERS.AUTH.LOGIN.PATH);
  }

  let decodedToken: unknown;
  try {
    decodedToken = simpleDecode(token);
  } catch {
    redirect(APP_ROUTERS.AUTH.LOGIN.PATH);
  }

  const { token: verifyToken, email } = decodedToken as {
    token: string | null;
    email: string | null;
  };

  if (!verifyToken || !email) {
    redirect(APP_ROUTERS.AUTH.LOGIN.PATH);
  }

  const response = await verifyTokenAction({
    verifyTokenBody: {
      token: verifyToken,
      type: ETokenType.LOGIN,
      email,
    },
  });

  if (response.status !== EResponseStatus.SUCCESS) {
    redirect(APP_ROUTERS.AUTH.LOGIN.PATH);
  }

  return (
    <AuthLayout
      name={APP_ROUTERS.AUTH.VERIFY_LOGIN_OTP.NAME}
      title="Verify your login"
      description={`Enter the verification code we sent to your email address: ${email}.`}
      icon={
        <MobileActionOTPCodeIcon
          size={40}
          className="text-primary"
          strokeWidth={0.3}
        />
      }
      bgText="Verify"
    >
      <OTPValidationForm token={verifyToken} />
    </AuthLayout>
  );
};
export default VerificationOTPPage;
