import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"

type Session = Awaited<ReturnType<typeof supabase['auth']['getSession']>>['data']['session'];

type Prop = {
    children: ({ session }: { session: Session }) => React.ReactNode;
    onUnauthenticated?: () => void
};

const verifySession = async () => {
    const {data, error} = await supabase.auth.getSession()
    if (error){
        console.log(error.message, error.status)
    } 

    return data.session;
}

export const Layout:React.FC<Prop> = ({children}) => {
    const [session, setSession] = useState<Session>(null);


    useEffect(() => {
        verifySession()
            .then(session => setSession(session));
    },[])

    return(
        <>
        {children({ session })}
        </>
    )
}