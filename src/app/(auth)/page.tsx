import LoginForm from "@/components/features/auth/login-form";
import { WavingHandIcon } from "@/components/icons";
import AuthLayout from "@/components/layouts/auth-layout";

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
