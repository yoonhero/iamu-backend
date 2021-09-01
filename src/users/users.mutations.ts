import client from "../client"

export default {
  Mutation: {
    createAccount: async (_, {firstName, lastName, username, email, password}:{firstName: string, lastName: string, username: string, email:string, password:string}) => {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ]
          }
        })
        console.log(existingUser)
        
        // hash password 
        // save and return the user
    }
  }
}