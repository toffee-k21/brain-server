import { prismaClient } from "../client/db"

const queries = {
  getThoughts: async (parent: any, args: any, context: any) => {
    if(context.user !=null) {
      let result:any = [];
      try{
         result = await prismaClient.thought.findMany({
      where: { authorId: context.user.id },
      })
      }
      catch{
        console.log("error");
      }
      return result;
    }

}
}

const UserQuery  =( )=>{
  return async (parent: any,args:any,context:any)=>{
    if (parent !=null) {
      const result = await prismaClient.user.findMany({
    where: { id: parent.authorId },
    })
    return result;
    }}
}

const mutations ={
  createThought: async(parent:any,{payload}:any,context:any)=>{
    console.log(payload)
      if (!payload) {
                throw new Error("Input is required");
            }
    if(context.user !=null){
      const result = await prismaClient.thought.create({
        data:{
          content: payload.content,
          authorId: context.user.id
        }
      })
      console.log(result);
      return result;
    }
  }
}

export const resolvers = { queries, userquery: UserQuery,mutations }