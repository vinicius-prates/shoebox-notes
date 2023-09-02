import { useState } from "react"
import { Input } from "../components/Input"
import { Button } from "../components/Button";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";

export const SignIn = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signinSupabase = async () => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error){
            console.log(error.message, error.status)
            Swal.fire({
                title: 'Opss...',
                text: `Something went wrong... `,
                icon: 'error',
                confirmButtonText: 'OK!'
            }).then(()=> {
                setEmail('')
                setPassword('')
            })
        } else {
            Swal.fire({
                title: 'Log In',
                text: 'You logged in.',
                icon: 'success',
                confirmButtonText: 'OK!'
            }).then(() => {
                console.log(data.session)
                navigate('/')
                })
        }
        return data
    }
    return(
        <Layout>
            {({session})=> {
                if(session){
                    console.log(session)
                    Swal.fire({
                        title: 'Login',
                        text: 'You are already logged in!',
                        icon: 'info',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        navigate('/')
                    })
                } else {
                    return(
                        <div className="flex flex-col gap-10 items-center h-screen w-screen justify-center">
                            <h1 className="text-2xl font-bold">Welcome back!</h1>
                            <div className="flex flex-col gap-5 lg:w-1/3">
                                <Input
                                name="email"
                                value={email}
                                length={200}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                type="text"
                                />
                                <Input
                                name="password"
                                value={password}
                                length={80}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                type="password"/>
                                <Button onClick={signinSupabase}>Signin</Button>
                            </div>
                        </div>
                    )
                }

            }}

        </Layout>
        
    )
}