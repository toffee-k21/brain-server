import { prismaClient } from '../client/db';
import axios from 'axios';
import JWTService from '../services/jwt';

const queries = {
    verifyGoogleToken: async(_:any,{token}:{token:string})=>  {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.append('id_token',googleToken);

        const { data } = await axios.get(googleOauthURL.toString(),{
            responseType: 'json',
        });

        let user = await prismaClient.user.findUnique({where : {email : data.email }});

        if(!user){
            await prismaClient.user.create({
                data:{
                    email: data.email,
                    name: data.name,
                    proflieImgURL: data.picture,
                }
            });
            user =  await prismaClient.user.findUnique({where : {email : data.email}});
        }
        
        if(user == null) throw new Error('User not found');

        const userToken = await JWTService.genrateTokenForUser(user!.id.toString());
        return userToken;
    },
    getCurrentUser: async(_:any,{}:any,context:any) =>{
        if(context.user == null ) return null;

        const user = await prismaClient.user.findUnique({where : {id : context.user.id}});
        return user;
    }

}

export const resolvers = {queries}