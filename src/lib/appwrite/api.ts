import { ID } from "appwrite";

import { INewUser } from "@/types";
import { account } from "./config";

export const createUserAccount = async (user: INewUser) => {
  try {
    // README: Create new Account with Appwrite
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    return newUser;
  } catch (error) {
    return error;
  }
};
