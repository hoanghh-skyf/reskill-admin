import { WavingHandIcon } from "@/shared/components/icons";
import AuthLayout from "@/shared/components/layouts/auth-layout";
import LoginForm from "@/modules/authentication/ui/login-form";

export default function LoginPage() {
  return (
    <AuthLayout
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
