/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { Navbar } from "../../components/Navbar";
import { supabase } from "../../supabaseClient";
import { useEffect, useState } from "react";
import { NoteCard } from "../../components/NoteCard";
import { NoteType } from "../../App";
import { Spinner } from "../../components/Spinner";
import { BrownButton, RedButton } from "../../components/Button";
import Swal from "sweetalert2";
import { EditNoteModal } from "../../components/Modal";

export const Note = () => {
  useEffect(() => {
    fetcher();
  }, []);
  const navigate = useNavigate();
  const par = useParams();
  const [note, setNote] = useState<NoteType>();
  const [open, setOpen] = useState(false);
  const fetcher = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select()
      .eq("id", par.id);

    if (!data) {
      console.log("Essa data é nullaaaaaa");
      return;
    }
    if (error) {
      return console.log(`Ih`);
    } else {
      const newnote = data as unknown as NoteType[];
      console.log(newnote);
      setNote(newnote[0]);
    }
  };

  const deleteNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able undelete your note.",
      showCancelButton: true,
      confirmButtonColor: "#532915",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("notes")
          .delete()
          .eq("id", note!.id);

        if (error) {
          Swal.fire({
            text: "Something went wrong...",
            confirmButtonText: "Ok",
          });
          return;
        }
        Swal.fire({
          text: "Your note has been deleted",
        }).then(() => navigate("/home"));
      }
    });
  };

  return (
    <Layout>
      {({ session }) => {
        if (!note) {
          return (
            <div className="flex h-screen w-full items-center justify-center ">
              <Spinner />
            </div>
          );
        } else {
          return (
            <div className="flex flex-col gap-10">
              <Navbar />
              <div className="flex flex-col gap-10 items-center w-2/3 self-center">
                <NoteCard
                  id={note.id}
                  title={note.title}
                  note={note.note}
                  created_at={note.created_at}
                />
              </div>
              <div className="flex flex-row gap-5 self-center">
                <BrownButton onClick={() => {if(!session){
                   Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You need to be logged to edit a note!",
                    footer: '<a href="/signin">Login</a>',
                  });
                  return
                }
                setOpen(true)}}>Edit</BrownButton>
                <RedButton
                  onClick={() => {
                    if (!session) {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "You need to be logged to delete a note!",
                        footer: '<a href="/signin">Login</a>',
                      });
                      return;
                    }
                    deleteNote();
                  }}
                >
                  Delete
                </RedButton>
              </div>
              <EditNoteModal
                noteNote={note.note}
                noteTitle={note.title}
                noteId={note.id}
                open={open}
                setOpen={setOpen}
              />
            </div>
          );
        }
      }}
    </Layout>
  );
};
