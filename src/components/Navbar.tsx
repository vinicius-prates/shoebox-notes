import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { BrownButton, WhiteBrownButton } from "./Button";
import { Layout } from "./Layout";
import Swal from "sweetalert2";
import { CreateNoteModal } from "./Modal";
import { useState } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
    const signoutSupabase = async () => {
        const {error} = await supabase.auth.signOut()

        if(!error){
            Swal.fire({
                title: 'Log Out',
                text: 'You logged out.',
                icon:'info',
                confirmButtonText:'OK!'
            }).then(
                () => {
                    location.reload()
                    navigate('/home')
                }
            )
        }

        return error;
    }
  return (
    <Layout>
      {({ session }) => {
        if (!session) {
          return (
            <div className="flex flex-row lg:justify-between lg:px-40 justify-evenly py-10 cursor-pointer">
              <a href="/home" className="text-3xl font-extrabold text-[#532915]">Shoe Box</a>
              <div className="flex flex-row gap-4">
                    <BrownButton onClick={() => navigate('/register')}>Register</BrownButton>
                    <WhiteBrownButton onClick={() => navigate('/signin')}>Sign In</WhiteBrownButton>
              </div>
            </div>
          );
        } else {
          return (
            <>
            <div className="flex flex-row lg:justify-between lg:px-40 py-10">
              <a href="/home" className="text-3xl font-extrabold text-[#532915] cursor-pointer hover:shadow-md transition-all duration-300">Shoe Box</a>
              <div className="flex flex-row gap-4">
                    <BrownButton onClick={() => { setOpen(true)}}>New Note</BrownButton>
                    <WhiteBrownButton onClick={signoutSupabase}>Log Out</WhiteBrownButton>
              </div>
            </div>
            <CreateNoteModal open={open} setOpen={setOpen}/>
            </>
          );
        }
      }}
    </Layout>
  );
};
