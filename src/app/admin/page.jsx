'use client';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin-login');
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <button onClick={() => router.push('/admin-employee')}>Employees</button>
      <button onClick={logout}>Logout</button>
    </>
  );
}
