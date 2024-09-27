"use client";
import { useState, useEffect } from "react";
import ClassData from "./data.json";
import Link from "next/link";
export default function Home() {
  
  
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("savedStudents");
    if (savedStudents) {
      return JSON.parse(savedStudents);
    }
   
    return ClassData.students.map(student => ({
      ...student,
      isAttended: false,
    }));
  });

  const [showAttendance, setShowAttendance] = useState(true);


  const handleClick = studentId => {
    const updatedStudents = students.map(student =>
      student.id === studentId
        ? { ...student, isAttended: !student.isAttended

        }
        : student 
    );

    setStudents(updatedStudents);
    
  };

 
  useEffect(() => {
    localStorage.setItem("savedStudents", JSON.stringify(students));
    console.log(students);
  }, [students]);

  function apply(){
  setShowAttendance(false);
  const data =  JSON.parse(localStorage.getItem('savedStudents'));
  const updatedStudents = data.map(student =>
    !student.isAttended
      ? { ...student, absenceStatus : `${Number(student.absenceStatus)+1}`

      }
      : student 
  );
  localStorage.setItem("savedStudents", JSON.stringify(updatedStudents));
  setStudents(updatedStudents);
  }

  return (
    <>
    <div className="container">
      {showAttendance ? (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.name}{" "}
              <input
                type="checkbox"
                checked={student.isAttended}
                onChange={() => handleClick(student.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <>
          <ul>
            {students.map(student => (
              <li key={student.id}>
                {student.name} - {student.isAttended ? "VAR" : "YOK"}
              </li>
            ))}
          </ul>
          <div>
            <span>
              Katılan öğrenci sayısı: {students.filter(x => x.isAttended).length}
            </span>{" "}
            <br />
            <span>
              Katılmayan öğrenci sayısı:{" "}
              {students.filter(x => !x.isAttended).length}
            </span>
          </div>
        </>
      )}

      {showAttendance && (
        <button
          onClick={apply}
        >
          Yoklamayı Tamamla
        </button>
      )}
      
      {!showAttendance && (
        <>
        <div className="student-list">
          <ul>
            {
              students.map((x,i)=> <li key={i}>{x.name} <Link href={"/student/" + x.id}> Detay Göster </Link> </li>)
            }
          </ul>

        </div>
        </>
        
      )}

       </div>
    </>
  );
}
