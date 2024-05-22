import { Button, Checkbox, Input } from "@nextui-org/react";
import { Link } from "../components/Link";
import { useState } from "react";
import { register } from "../effector/auth/authStore";

export const RegisterPage = () => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [agreement, setAgreement] = useState<boolean>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name && email && password) {
          register({ name, email, password });
        }
      }}
      className="flex flex-col gap-2"
    >
      <h1 className="text-2xl text-secondary font-bold text-center">
        Регистрация
      </h1>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />
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
      <Checkbox
        color="secondary"
        isSelected={agreement}
        onValueChange={setAgreement}
      >
        Согласен с обработкой персональных данных
      </Checkbox>
      <Button
        type="submit"
        disabled={!name || !email || !password || !agreement}
        className="w-full disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:opacity-25"
        color="secondary"
      >
        Зарегистрироваться
      </Button>
      <div>
        Есть аккаунт? <Link to="/auth/login">Войти</Link>
      </div>
    </form>
  );
};
