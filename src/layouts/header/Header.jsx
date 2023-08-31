'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USR, SET_ACTIVE_USER } from '@/redux/slice/authSlice';

import styles from './Header.module.scss';
import InnerHeader from '../innerHeader/InnerHeader';

const Header = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
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

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userID: user.uid
        }));
      } else {
        setDisplayName('');

        dispatch(REMOVE_ACTIVE_USR({}));
      }
    })
  }, [dispatch, displayName])

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