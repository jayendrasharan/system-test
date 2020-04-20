import React , {useEffect , useRef}from 'react'

export default function Search(props) {
     const searchRef = useRef(null)

    const keydown = (event) => {
        if(event.key == 'F' && event.ctrlKey && event.shiftKey){
           searchRef.current.focus()
        }
    }
    useEffect(() => {
     window.addEventListener('keydown',keydown )

     return () => {
         window.removeEventListener('keydown',keydown)
     }
    },[])
    return (
         <input ref={searchRef}  placeholder="search" onChange={props.search}/>
    )
}
