import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Demo from '../components/Demo'
import Card from '../components/Card'
import Footer from '../components/Footer'



export default function Home() {
  
    return ( 
      <>
     <Navbar />
  <Hero />
  <Card />
  <Demo />
<Footer />
     </>
    ) 
  
}
