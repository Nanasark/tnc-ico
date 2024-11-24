"use server";

import { revalidatePath } from "next/cache";

export async function revalidateHome() {
  revalidatePath("/");
  return { revalidated: true, now: Date.now() };
}
