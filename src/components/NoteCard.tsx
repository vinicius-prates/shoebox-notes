export const NoteCard = ({id, title, note, created_at } : {id: string, title: string, note: string, created_at: string }) => {
    return(
        <div  key={id} className="flex flex-col justify-between gap-10 p-4 bg-[whitesmoke] text-[#532915] shadow-md rounded-xl w-72 md:w-10/12 truncate hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-md truncate">{note}</p>
            </div>
            <div>
                <p className="italic opacity-50 text-right self-end">{created_at}</p>
            </div>
        </div>
    )
}