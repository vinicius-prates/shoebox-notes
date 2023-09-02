import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const PageNotFound = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
    },[])
    return(
        <div>Error</div>
    )
}