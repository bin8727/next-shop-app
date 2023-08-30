'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

import styles from './Header.module.scss';
import InnerHeader from '../innerHeader/InnerHeader';

const Header = () => {
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf('@'));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);

          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
      } else {
        setDisplayName('');
      }
    })
  }, [])

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('로그아웃 되었습니다.');
        router.push('/');
      })
      .catch((err) => {
        toast.error(err.message);
      })
  };

  if (pathname === '/login' || pathname === '/register' || pathname === '/reset') {
    return null;
  };

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={'/login'}>
              로그인
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/admin/dashboard'}>
              관리자
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/order-history'}>
              주문목록
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/'} onClick={logoutUser}>
              로그아웃
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/'}>
              제휴 마케팅
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/'}>
              쿠팡 플레이
            </Link>
          </li>

          <li className={styles.item}>
            <Link href={'/'}>
              고객센터
            </Link>
          </li>
        </ul>
      </div>

      {
        pathname.startsWith('/admin') ?
        null :
        <InnerHeader />
      }
    </header>
  );
}

export default Header;