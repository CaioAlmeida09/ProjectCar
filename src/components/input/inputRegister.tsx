import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder: string;
  type: string;
  name: "name" | "password" | "email";
  register: UseFormRegister<{
    name: string;
    password: string;
    email: string;
  }>;
  error?: string;
  rules?: RegisterOptions<{
    name: string;

    password: string;
    email: string;
  }>;
}

export function InputRegister({
  name,
  type,
  placeholder,
  register,
  error,
  rules,
}: InputProps) {
  return (
    <>
      <input
        className="w-full h-10 rounded-lg border-2 px-2 text-zinc-900"
        placeholder={placeholder}
        type={type}
        {...register(name, rules ?? {})}
        id={name}
      />
      {error && (
        <p className="md:mt-2 mt-y text-red-500 md:text-xl text-xs">
          {" "}
          {error}{" "}
        </p>
      )}
    </>
  );
}
