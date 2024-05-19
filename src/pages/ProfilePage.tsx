import { useAuth } from "../effector/auth/authStore";

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl text-secondary font-bold">Профиль</h1>
      <div className="flex gap-2">
        <span className="font-bold">Имя:</span>
        <span>{user?.name}</span>
      </div>
      <div className="flex gap-2">
        <span className="font-bold">Электронная почта:</span>
        <span>{user?.email}</span>
      </div>
    </>
  );
};
