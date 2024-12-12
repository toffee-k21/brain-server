import graphqlServer from "./app";

const run = async ( ) =>{
const app = await graphqlServer();
const PORT = 4000;
app.listen(PORT,()=>{
    console.log("Server is running on port",PORT);
})
}
run();