import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Demo from '../components/Demo'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { useSetRecoilState } from 'recoil';
import { connectedCredentials } from '../Store/Variables';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { useEffect } from 'react';



export default function Home() {
  const setUserCredentials = useSetRecoilState(connectedCredentials);
  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
    
      if (user) {
        const id = await auth.currentUser.getIdToken();
        console.log(id);
        setUserCredentials({
          name: user.email,
          token: id
        })
      } else {

        setUserCredentials({
          name: null,
          token: null
        })
      }
    });

  }, []);
    return ( 
      <>
      
  <Hero />
  <Card />
  <Demo />

</>
    ) 
  
}
