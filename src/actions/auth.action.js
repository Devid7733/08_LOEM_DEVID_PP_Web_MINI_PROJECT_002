"use server";
import { registerService } from "../service/auth.service";

export async function registerAction(payload) {
  try {
    const newUser = await registerService(payload);
    return {
      success: true,
      message: newUser?.message || "Register successful",
      payload: newUser?.payload || null,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      payload: null,
    };
  }
}

