import LoginForm from "@/modules/authentication/ui/login-form";
import { WavingHandIcon } from "@/shared/components/icons";
import AuthLayout from "@/shared/components/layouts/auth-layout";
import { APP_ROUTERS } from "@/shared/constants";

export default function LoginPage() {
  return (
    <AuthLayout
      name={APP_ROUTERS.AUTH.LOGIN.NAME}
      icon={
        <WavingHandIcon
          size={40}
          className="text-primary -rotate-20"
          strokeWidth={0.5}
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
