import { Client, Account, ID } from "appwrite";
import config from "../config/config";

interface UserDetails {
	email: string;
	password: string;
	name?: string;
}

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
		this.account = new Account(this.client);
	}

	// appwrite create account function
	async createAccount({ email, password, name }: UserDetails) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);
			if (userAccount) {
				// return userAccount;
				//login if account created
			} else {
				return userAccount;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }: UserDetails) {
		try {
			const loggedin = await this.account.createEmailPasswordSession(email, password);
			return loggedin;
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUseer() {
		try {
			const result = await this.account.get();
			return result;
		} catch (e) {
			console.log("Appwrite get User error: ", e);
		}

		return null;
	}

	async logout() {
		try {
			// const logout = this.account.deleteSessions(); // deletesessions will logout id from all browsers
			const logout = this.account.deleteSession("current"); // deletesessions will logout id from all devices
		} catch (error) {
			console.log("Appwrite serive :: logout :: error", error);
		}
	}
}

// object of AuthService class
const authService = new AuthService();

export default authService;
