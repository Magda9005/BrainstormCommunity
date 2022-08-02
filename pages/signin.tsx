import { getProviders, signIn } from "next-auth/react";
import Navbar from "../components/Navbar";
import styles from '../components/modules/SignIn.module.scss';
import type { NextPage } from 'next';
import {GetServerSideProps } from 'next';


interface SignInProps {
providers:{
provider:{
  name:string
}
}
}

const SignIn:NextPage<SignInProps>=({ providers })=> {
  return (
    <>
    <Navbar userLoggedIn={null}/>
    <div className={styles['container']}>
    {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className={styles['signin-button']} onClick={() => signIn('github',{callbackUrl:'http://localhost:3000/questions'})}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
     
    </>
  );
}

export default SignIn;

export const getServerSideProps:GetServerSideProps=async(context)=> {
  return { props: { providers: await getProviders() } };
}