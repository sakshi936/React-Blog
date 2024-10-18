import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

interface db {
	title: string;
	slug: string;
	content: string;
	featuredImage: string;
	status: string;
	userId: string;
}

export class Services {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage();
	}

	async createPost({ title, slug, content, featuredImage, status, userId }: db) {
		try {
			return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status, userId });
		} catch (err) {
			console.log("Appwrite:  CreatePost", err);
		}
	}
	async updatePost({ slug, title, content, featuredImage, status }: db) {
		try {
			return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug, { title, content, featuredImage, status });
		} catch (err) {
			console.log("Appwrite:  UpdatePost", err);
		}
	}
	async deletePost({ slug }: db) {
		try {
			await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
			return true;
		} catch (err) {
			console.log("Appwrite:  DeletePost", err);
			return false;
		}
	}

	async getPost({ slug }: db) {
		try {
			return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug);
		} catch (error) {
			console.log("Appwrite:: Getpost ", error);
		}
	}
	async getPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries);
		} catch (error) {
			console.log("Appwrite:: Getposts ", error);
			return false;
		}
	}

	//file upload servises

	async uploadFile(file: string) {
		try {
			return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);
		} catch (error) {
			console.log("Appwrite:: UploadFile ", error);
			return false;
		}
	}

	//delete file

	async deleteFile(fileId: string) {
		try {
			return await this.bucket.deleteFile(config.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Appwrite:: DeleteFile ", error);
			return false;
		}
	}
	async getFilePreview(fileId: string) {
		try {
			return await this.bucket.getFilePreview(config.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Appwrite:: getFilePreview ", error);
			return ""; // empty string inplace of url
		}
	}
}

const service = new Services();
export default service;
