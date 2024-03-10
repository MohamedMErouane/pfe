"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/styles.module.css';
import { IoMdSchool } from "react-icons/io";
import Link from 'next/link';
import AdditionalInfo from '@/components/AdditionalInfo';
import Last from '@/components/last';
import Footer from '@/components/Foter';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';


export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <><div>
      <Head>
        <title>Study With Me</title>
        <meta name="description" content="Study with me landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <nav className={`${styles.navbar} ${showNavbar ? '' : styles.hide}`}>
        <div className={styles.navbarLogo}>
          <IoMdSchool size={40} />
          <span>Study
            With Me</span>
        </div>
        <div className={styles.navbarButtons}>
          <Link href="/Register" passHref className={`${styles.navButton} ${styles.signup}`}>
            Sign Up
          </Link>
          <Link href="/Login" passHref className={`${styles.navButton} ${styles.login}`}>
            Login
          </Link>
        </div>
      </nav>

      {/* Video Background */}
      <video autoPlay muted loop style={{ minWidth: '100%', minHeight: '100%', objectFit: 'cover' }}>
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.bigText}>
        <h1>Meet, chat, and study with students from all over School🌍</h1>
        <p>Join the largest global student community online of ESTE and say goodbye to lack of motivation.</p>
        <Link href="/learn-more" passHref className={styles.learnMoreButton}>
          Study Together Now
        </Link>
        <div className={styles.additionalText}>
          <p className={styles.transparentText}>100% Free!</p>
           <div className={styles.cercle}></div>
          <p className={styles.transparentText}>
          
          500 Online</p>
        </div>    </div>


    </div>
    
    <AdditionalInfo />
    <h2 className="mt-40 text-3xl font-bold mb-8 text-black text-center">Discover Study Together</h2>

    <Features/>
     {/* Title and subtitle */}
     <div className=" mt-40 section-header text-center mb-8" >
        <h2 className="text-4xl font-bold mb-4 text-black">
          Find your community. Set Goals. <br/>Achieve Them. Get rewarded.
        </h2>
      </div>
    <AboutSection/>

    <Last /> 
   
    <Footer />
    
    </>
  );
}
