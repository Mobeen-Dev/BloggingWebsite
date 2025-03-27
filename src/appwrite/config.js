import config from "../config/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    Client = new Client();
    databases;
    storage;
    defaultQueries = [Query.equal("status", "active")];

    constructor(){
        this.Client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.Client);
        this.storage = new Storage(this.Client);
    }
    
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const post = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                // ID.unique(),
                slug,   
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            return post;
        } catch (error) {
            console.log("Appwrite :: createPost :: error", error);
            return error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            const post = await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
            return post;
        } catch (error) {
            console.log("Appwrite :: updatePost :: error", error);
            return error;
        }
    }

    async deletePost(slug) {
        try {
            const post = await this.databases.deleteDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
            );
            if (post){
                return true;
            }

        } catch (error) {
            console.log("Appwrite :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug,
            );
            return post;
        } catch (error) {
            console.log("Appwrite :: getPost :: error", error);
            return false;
        }
    }

    async getPosts() {
        try {
            const posts = await this.databases.listDocuments(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                [...defaultQueries,

                ]
               
            );
            return posts; 
        } catch (error) {
            console.log("Appwrite :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID,unique(),
                file,

            );
        } catch (error) {
            console.log("Appwrite :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(fileId);
            return true;
        } catch (error) {
            console.log("Appwrite :: deleteFile :: error", error);
            return false;
        }
    }

    async getfilePreview(fileId){
        try{
            return await this.storage.getFilePreview(fileId);
        } catch (error) {
            console.log("Appwrite :: getfilePreview :: error", error);
            return false;
        }
    }
}


const service = new Service();
export default service;