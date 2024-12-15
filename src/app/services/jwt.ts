import { prismaClient } from "../client/db";
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

class JWTService {
    public static async genrateTokenForUser(userId: string){
        const user = await prismaClient.user.findUnique({where : {id : userId}});
        const payload = {
            email: user?.email,
            name: user?.name,
            id: user?.id,
        }
        const token = JWT.sign(payload,JWT_SECRET as string);
        return token;
    }
    public static decodeToken(token: string){
        return JWT.verify(token,JWT_SECRET as string);
    }
}

export default JWTService;