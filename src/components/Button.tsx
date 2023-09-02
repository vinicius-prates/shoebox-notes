type ButtonProps = {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, ...props} : ButtonProps) => {
    return (
        <button
        className="bg-blue-500 disabled:bg-blue-900 text-white font-bold px-5 py-2  hover:bg-blue-700 transition-color transition-all rounded-lg"
        {...props}
        >
            {children}
        </button>
    )
}

export const BrownButton = ({children, ...props} : ButtonProps) => {
    return(
        <button
        className="bg-[#532915] text-white px-5 py-1 transition-color transition-all font-bold rounded-lg hover:bg-white hover:text-[#532915] border-[#532915] border-2"
        {...props}
        >
            {children}
        </button>
    )
}

export const WhiteBrownButton = ({children, ...props} : ButtonProps) => {
    return(
        <button
        className="bg-white text-[#532915] px-5 py-1 transition-color font-bold transition-all rounded-lg hover:bg-[#9A7B4F] hover:text-white border-[#532915] hover:border-[#9A7B4F] border-2"
        {...props}
        >   
            {children}
        </button>
    )
}

export const RedButton = ({children, ...props}: ButtonProps) => {
    return(
        <button
        className="bg-red-700 text-white px-5 py-1 transition-color transition-all font-bold rounded-lg hover:bg-white hover:text-red-700 border-red-700 border-2"
        {...props}
        >
            {children}
        </button>
    )
}