import { APIService, RequestBody } from '../api';
import TokenService from '../api/token.service';

export interface IPost {
    id?: string;
    content: string;
    userID: string;
    comments: string[];
    createdAt?: Date;
}

export class Post implements IPost {
    id: string = "";
    content: string;
    userID: string;
    comments: string[] = [];
    createdAt: Date = new Date();
    
    constructor(content: string, userID: string, id?: string, comments?: string[], createdAt?: Date,){
        this.content = content;
        this.userID = userID;
        if(id){
            this.id = id;
        }
        if(comments){
            this.comments = comments;
        }
        if(createdAt) {
            this.createdAt = createdAt;
        }
    }

    // TODO function that makes api call and creates post
    static async create(newPost: IPost): Promise<IPost> {
        let data: any;
        const token = TokenService.getToken();
        let api = new APIService(token).setMethod("POST");
        api = api.setHeaders([
            {
                key: 'Accept',
                value: 'application/json'
            }, 
            {
                key: 'Content-Type',
                value: 'application/json'
            },
            {
                key: 'Authorization',
                value: 'Bearer '+api.jwtToken
            }
        ]);
        const body = new RequestBody<IPost>(newPost);
        const request = api.createRequest("posts/create", body.requestBody);
        try {
            const result = await api.send(request);
            if(result.data.success) {
                // success
                data = result.data.item;
            }
        } catch (e) {
            console.log('Error adding post');
            console.log(e);
        }
        return data;
    }

    static async loadAll(): Promise<IPost[]> {
        let posts: any;
        const token = TokenService.getToken();
        let api = new APIService(token).setMethod("GET");
        api = api.setHeaders([
            {
                key: 'Accept',
                value: 'application/json'
            }, 
            {
                key: 'Content-Type',
                value: 'application/json'
            },
            {
                key: 'Authorization',
                value: 'Bearer '+api.jwtToken
            }
        ]);
        const request = api.createRequest("posts");
        try {
            const result = await api.send(request);
            if(result.status === 200) {
                // success
                posts = result.data.item;
            }
        } catch (e) {
            console.log('Error getting all posts');
            throw e;
        }
        return posts;
    }

    // TODO function that makes api calls and gets comments
    getComments() {

    }

    // TODO function that builds user info OR should it already be pre-built?
    getUserInfo(){
        
    }
}