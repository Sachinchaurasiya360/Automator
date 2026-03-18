import { signupTypes } from "@/lib/types/auth";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const Authentication={
    providers:[
        CredentialsProvider({
                name: 'Credentials',

                credentials:{
                    username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
                },
        async authorize(credentials,req){
            const result= signupTypes.safeParse(credentials)
            if(!result.success){
                throw Error("Invalid input")
            }
            const {name,email, password}= result.data;
            const isEmailExist= 

            
        }

        }
    )
    ]
}