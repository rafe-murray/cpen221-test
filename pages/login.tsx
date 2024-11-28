// import AcmeLogo from '@/app/ui/acme-logo';
import * as React from 'react';
import LoginForm from 'components/v2/Form/login-form';
import CommonLayout from 'components/v2/Layout';
import Head from 'next/head';
import type { NextPage } from 'next';
 
const LoginPage : NextPage = () => {
    return (
        <>
        <Head>
          <title>Login</title>
          <meta name='description' content='login page' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
  
        <CommonLayout
          headerProps={{
            hideMenu: true,
          }}
        >
          <h1 className='font-bold text-5xl'>Login</h1>
          <LoginForm />
        </CommonLayout>
      </>
  );
}

export default LoginPage;