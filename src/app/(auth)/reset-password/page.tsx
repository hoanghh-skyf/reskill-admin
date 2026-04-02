import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { verifyTokenAction } from "@/modules/authentication/actions.server";
import ResetPasswordForm from "@/modules/authentication/ui/reset-password-form";
import AuthLayout from "@/shared/components/layouts/auth-layout";
import { APP_ROUTERS, EResponseStatus, ETokenType } from "@/shared/constants";
import { simpleDecode } from "@/shared/lib/utils";

const ResetPasswordPage = async ({
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
      type: ETokenType.FORGOT_PASSWORD,
      email,
    },
  });

  if (response.status !== EResponseStatus.SUCCESS) {
    redirect(APP_ROUTERS.AUTH.LOGIN.PATH);
  }

  return (
    <AuthLayout
      name={APP_ROUTERS.AUTH.RESET_PASSWORD.NAME}
      title="Set new password"
      description="Your new password must be different from previously used passwords."
      icon={
        <ShieldCheck size={40} className="text-primary" strokeWidth={1.5} />
      }
      bgText="Reset"
    >
      <ResetPasswordForm email={email} token={verifyToken} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
