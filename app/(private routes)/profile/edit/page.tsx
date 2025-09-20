'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from '.EditProfilePage.module.css'; 
import { api } from '@/lib/api/api';
import { User } from '@/types/user';

export default function EditProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get<User>('/users/me');
        setUser(data);
        setUsername(data.username);
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.patch('/users/me', { username });
      router.push('/profile'); 
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
