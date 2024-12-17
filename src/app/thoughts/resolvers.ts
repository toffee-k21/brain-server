import { prismaClient } from "../client/db"

const queries = {
  getThoughts: async (parent: any, args: any, context: any) => {
    const result = await prismaClient.thought.findMany({
  where: { authorId: context.user.id },
  })

return result;}
}

const UserQuery  =( )=>{
  return async (parent: any)=>{
    const result = await prismaClient.user.findMany({
  where: { id: parent.authorId },
  })
  return result;
  }
}


export const resolvers = { queries, userquery: UserQuery }