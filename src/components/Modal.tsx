import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BrownButton } from "./Button";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
export const CreateNoteModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const createNote = async () => {
    const { error } = await supabase.from("notes").insert({
      title: title,
      note: note,
    });
    if (error) {
      console.log(error.message);
      return;
    }

    setOpen(false);
    location.reload()
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-0 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-row">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Create Note
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-4 w-full">
                        <div>
                          <h2 className="text-md text-black">Title</h2>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            maxLength={120}
                            name="title"
                            placeholder="new note title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                            type="text"
                          />
                        </div>
                        <div>
                          <h2 className="text-md text-black">Note</h2>
                          <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-60 resize-none md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            maxLength={400}
                            name="note"
                            placeholder="Type here..."
                            onChange={(e) => {
                              setNote(e.target.value);
                            }}
                            value={note}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <BrownButton
                    onClick={() => {
                      createNote();
                      
                    }}
                  >
                    Done
                  </BrownButton>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export const EditNoteModal = ({
  open,
  setOpen,
  noteTitle,
  noteNote,
  noteId
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteTitle: string,
  noteNote:string,
  noteId: string
}) => {

  useEffect(() => {
    setTitle(noteTitle);
    setNote(noteNote);
  },[])
  const cancelButtonRef = useRef(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const editNote = async () => {
    const { error } = await supabase.from("notes").update({
      title: title,
      note: note,
    }).eq('id', noteId);
    if (error) {
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })
      return;
    }

    setOpen(false);
    location.reload()
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-0 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-row">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Edit Note
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col gap-4 w-full">
                        <div>
                          <h2 className="text-md text-black">Title</h2>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            maxLength={120}
                            name="title"
                            placeholder="new note title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                            type="text"
                          />
                        </div>
                        <div>
                          <h2 className="text-md text-black">Note</h2>
                          <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-60 resize-none md:w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            maxLength={400}
                            name="note"
                            placeholder="Type here..."
                            onChange={(e) => {
                              setNote(e.target.value);
                            }}
                            value={note}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 gap-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <BrownButton
                    onClick={() => {
                      editNote()
                    }}
                  >
                    Done
                  </BrownButton>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};