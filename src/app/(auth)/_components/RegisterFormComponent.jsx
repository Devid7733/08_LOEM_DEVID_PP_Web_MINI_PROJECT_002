"use client";

import { registerAction } from "../../../actions/auth.action";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function RegisterFormComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      birthdate: "",
    },
  });

  const onSubmit = async (data) => {
    const nameParts = data.name.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const payload = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
      birthDate: data.birthdate,
    };

    const result = await registerAction(payload);
    console.log(result);

    if (result.success) {
      router.push("/login?message=registered");
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder="Jane Doe"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birthdate
        </label>
        <input
          type="date"
          {...register("birthdate")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Create account
      </Button>
    </form>
  );
}