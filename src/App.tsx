import { useEffect, useState } from "react"
import { Navbar } from "./components/Navbar"
import { supabase } from "./supabaseClient"
import { NoteCard } from "./components/NoteCard"
import { Spinner } from "./components/Spinner"
export type NoteType = {
  id: string,
  title: string, 
  note: string,
  created_at: string
}
function App() {
  
  const [notes, setNotes] = useState<NoteType[]>([])
  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const { data:Notes , error} = await supabase.from('notes').select()

    if (error){
      console.log(`Error: ${error.message}, Code: ${error.code}`)
    }else{
      setNotes(Notes!)
      console.log(Notes)
    }
  }
  if(!notes){
    return(
      <div className="flex w-screen h-screen items-center justify-center">
        <Spinner/>
      </div>
    )
  }else{
    return (
    
      <div className="flex flex-col lg:gap-20">
        <Navbar/>
        
        <div className="max-w-screen flex flex-col gap-y-5 lg:grid lg:grid-cols-4 lg:gap-y-10  items-center lg:mx-40">
            {
              notes.map((note, key) => (
                <a href={`/note/${note.id}`} >
                <NoteCard
                key={key}
                id={note.id} 
                title={note.title}
                note={note.note}
                created_at={note.created_at}/>
                </a>
              ))
            }
        </div>
      </div>
      )
  }
  
  
}

export default App
