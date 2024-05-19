import { Button, Input } from "@nextui-org/react";
import { Link } from "../components/Link";
import { useState } from "react";
import { login } from "../effector/auth/authStore";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email && password) {
          login({ email, password });
        }
      }}
      className="flex flex-col gap-2"
    >
      <h1 className="text-2xl text-secondary font-bold text-center">
        Авторизация
      </h1>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Электронная почта"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <Button
        type="submit"
        disabled={!email || !password}
        className="w-full disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:opacity-25"
        color="secondary"
      >
        Войти
      </Button>
      <div>
        Нет аккаунта? <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </form>
  );
};
