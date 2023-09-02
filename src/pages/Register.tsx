import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { supabase } from "../supabaseClient";
import { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";


export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const register = async () => {

    if(password != confirmPassword) {
      Swal.fire({
        title: 'Opsss...',
        text: 'The password does not match.',
        icon: 'error',
        confirmButtonText: 'Ok!'
    })
        return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText:'Ok'
      }).then(() => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      })
    } else {
      Swal.fire({
        title: 'Sucess!',
        text: 'User created!',
        icon: 'success',
        confirmButtonText:'Login'
      })
      navigate('/signin')
    }
    return console.log(data);
  };

  return (
    <Layout>
      {({session}) => {
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
      <h1 className="text-2xl font-bold">Welcome!</h1>
      <div className="flex flex-col gap-5 lg:w-1/3">
        <Input
        name="email"
        value={email}
          length={200}
          type="text"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
        name="password"
        value={password}
        length={80}       
          type="password"
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Input 
        name="confirmPassword"
        value={confirmPassword}
        length={80}
        type="password"
        placeholder="Confirm your password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setConfirmPassword(e.target.value)}}/>
        <Button onClick={register}>Register</Button>
      </div>
    </div>
          )
        }
      }}
    </Layout>
  );
};
