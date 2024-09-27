"use client"

export default function Student({params}){
    const {id} = params
    const data = JSON.parse(localStorage.getItem("savedStudents"));
    const student = data.find(x => x.id == id);
    return(
        <>
        <p>{student.name}</p>
        <p>{student.absenceStatus}</p>
        </>
    )
}
