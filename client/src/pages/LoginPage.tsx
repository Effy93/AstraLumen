import LoginForm from "../components/forms/LoginForm";
import type IUser from "../types/IUser";

interface LoginPageProps {
  setUser: (user: IUser | null) => void;
}

export default function LoginPage({ setUser }: LoginPageProps) {
  return (
    <div className="login-page">
      <h2>Connexion</h2>
      <LoginForm setUser={setUser} />
    </div>
  );
}