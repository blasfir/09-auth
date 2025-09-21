import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image"; 
import { getServerMe } from '@/lib/api/serverApi';
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: `${user.username} profile`,
    description: `Profile page of ${user.username} (${user.email})`,
    openGraph: {
      title: `${user.username} profile`,
      description: `Profile page of ${user.username} (${user.email})`,
      url: "https://notehub.com/profile",
      images: [
        {
          url: user.avatar,
          width: 400,
          height: 400,
          alt: `${user.username}'s avatar`,
        },
      ],
    },
  };
}

export default async function ProfilePage() {
  const user = await getServerMe(); 

  return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <div className={css.header}>
	                <h1 className={css.formTitle}>Profile Page</h1>
	                <Link href="/profile/edit" className={css.editProfileButton}>
	                    Edit Profile
	                </Link>
	            </div>
                <div className={css.avatarWrapper}>
                    <Image
                      src={ user.avatar }
                        alt='User Avatar'
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                </div>
                <div className={css.profileInfo}>
                    <p>
                        Username: {user.username}
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                </div>
            </div>
        </main>

  );
}