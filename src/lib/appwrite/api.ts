import { ID, Query } from "appwrite";

import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

// todo: Create new Account with Appwrite Authentication
export const createUserAccount = async (user: INewUser) => {
  try {
    // * README: Create new Account with Appwrite
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    // init avatar
    const avatarUrl = avatars.getInitials(user.name);
    // console.log(avatarUrl);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    return error;
  }
};

// todo: save new user to database
export const saveUserToDB = async (user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

// todo: Sign in account with appwrite
export const signInAccount = async (user: {
  email: string;
  password: string;
}) => {
  try {
    const { email, password } = user;

    // this function create cookieFallback in localStorage
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    return error;
  }
};

// todo: check if user is logged in or not
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw Error;
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      throw Error;
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
