import { INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "../appwrite/api";

export const useCreateUserAccount = () => {
  /**
   * From TanStack docs: Unlike queries, mutations are typically
   * used to create/update/delete data or perform server side-effects.
   * For this purpose, TanStack Query exports a useMutation hook.
   */
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};
