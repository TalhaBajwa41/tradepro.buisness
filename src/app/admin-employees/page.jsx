'use client';
import { useEffect, useState } from 'react';

export default function AdminEmployeePage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then(setEmployees);
  }, []);

  return (
    <>
      <h1>Employees</h1>
      {employees.map((e) => (
        <div key={e._id}>
          <p>{e.name} - {e.email}</p>
        </div>
      ))}
    </>
  );
}
