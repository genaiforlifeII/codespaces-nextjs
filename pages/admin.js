import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
      return;
    }

    if (user) {
      checkAdminAccess();
    }
  }, [user, isLoading, router]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/admin/check');
      if (response.ok) {
        setIsAdmin(true);
        fetchAdminData();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      router.push('/dashboard');
    }
  };

  const fetchAdminData = async () => {
    try {
      const response = await fetch('/api/admin/data');
      const data = await response.json();
      setAdminData(data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null; // Will redirect
  }

  return (
    <div>
      {/* Your admin content */}
      {adminData && (
        <div>{/* Render admin data */}</div>
      )}
    </div>
  );
}