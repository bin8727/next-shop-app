'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import styles from './Auth.module.scss';
import LogoPath from '@/assets/colorful.svg';
import Loader from "@/components/loader/Loader";
import Input from "@/components/input/Input";
import AutoSignInCheckbox from "@/components/autoSignInCheckbox/AutoSignInCheckbox";
import Divider from "@/components/divider/Divider";
import Button from "@/components/button/Button";
import Link from "next/link";

const LoginClient = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const router = useRouter();

  const redirectUser = () => {
    router.push('/');
  };

  const loginUser = (e) => {
    e.preventDefault();

    setIsLoading(true);
  };

  const signInWithGoogle = () => {};

  return (
    <>
    {isLoading && <Loader />}
    <section className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Image src={LogoPath} alt="logo" />
        </h1>

        <form onSubmit={loginUser} className={styles.form}>
          <Input 
            email
            icon='letter'
            id='email'
            name='email'
            label='이메일'
            placeholder="아이디(이메일)"
            className={styles.control}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            password
            icon='lock'
            id='password'
            name='password'
            label='비밀번호'
            placeholder="비밀번호"
            className={styles.control}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className={styles.group}>
            <AutoSignInCheckbox 
              checked={isAutoLogin}
              onChange={(e) => setIsAutoLogin(e.target.checked)}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type='submit'
              width='100%'
            >
              로그인
            </Button>

            <Divider />

            <Button 
              width='100%'
              secondary
            >
              <Link href={'/register'}>
                회원가입
              </Link>
            </Button>
          
            <Divider />

            <div>
              <Button
                onClick={signInWithGoogle}
              >
                구글 로그인
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
    </>
  );
}

export default LoginClient;