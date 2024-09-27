"use client";
import { useEffect, useState } from "react";

export default function Student({ params }) {
  const { id } = params;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") { // localStorage erişimini güvence altına alıyoruz
      const data = JSON.parse(localStorage.getItem("savedStudents"));
      const foundStudent = data?.find(x => x.id == id);
      setStudent(foundStudent);
    }
  }, [id]);

  if (!student) {
    return <p>Öğrenci bilgisi bulunamadı.</p>;
  }

  return (
    <>
      <p>{student.name}</p>
      <p>{student.absenceStatus}</p>
    </>
  );
}

