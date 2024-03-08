import Card from "@/components/Cards";
import SideBar from "@/components/SideBar";
import Head from "next/head";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Modern Card</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head>
      <SideBar/>
      <div className="bg-hero w-screen h-screen bg-cover bg-fixed flex justify-center items-center ml-20" style={{backgroundImage: "url('/image.png')"}}>
    <Card />
</div>


    </div>
  );
}