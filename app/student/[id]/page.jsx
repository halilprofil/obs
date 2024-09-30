"use client";
import { useEffect, useState } from "react";
import classData from "/app/data.json"; // JSON verilerini import ettik

export default function Student({ params }) {
  const { id } = params; // URL parametresinden öğrenci ID'sini aldık
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // localStorage'dan verileri almak
      const data = JSON.parse(localStorage.getItem("savedStudents")) || classData.students; // Eğer localStorage'da veri yoksa, classData'dan al
      const foundStudent = data.find((x) => x.id == id); // ID'ye göre öğrenciyi bul
      setStudent(foundStudent);
    }
  }, [id]);

  if (!student) {
    return <p>Öğrenci bilgisi bulunamadı.</p>; // Eğer öğrenci bulunamazsa mesaj göster
  }

  return (
    <div className="container">
      <h1>Öğrenci Bilgileri</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Student Number</th>
            <th>Class</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Absence Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.studentNumber}</td>
            <td>{student.class}</td>
            <td>{student.age}</td>
            <td>{student.gender}</td>
            <td>{student.email}</td>
            <td>{student.absenceStatus === 0 ? "No Absence" : student.absenceStatus }</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
