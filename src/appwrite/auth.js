import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, username }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      return error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      return error;
    }
  }

  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      return error;
    }
    return  null;
  }
}

authService = new AuthService();
export default authService;
