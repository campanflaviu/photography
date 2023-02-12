
import Head from 'next/head'
import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Main from '../layouts/main';


export default function Home() {
  return (
    <>
      <div className="bg-scroll bg-[url('/Home_page.jpg')] bg-no-repeat bg-center bg-cover h-screen">
        <div >
          <ul className=" pt-96 flex justify-center  ">
            <li>
              <Link className=" hover:font-semibold  bg-none font-serif italic text-slate-500 p-3 m-2" href="/gallery">Weddings</Link>
            </li>
            <li>
              <Link className=" hover:font-semibold  bg-none font-serif italic text-slate-500 p-3 m-1" href="/engagement">Engagement</Link>
            </li>
            <li>
              <Link className=" hover:font-semibold  bg-none font-serif italic text-slate-500 p-3 m-1" href="/despre-noi">About</Link>
            </li>
            <li>
              <Link className=" hover:font-semibold  bg-none font-serif italic text-slate-500  p-3 m-1" href="/contact">Contact</Link>
            </li>
            <li>
              <Link className=" hover:font-semibold  bg-none font-serif italic text-slate-500 p-3 m-1" href="/client">Client</Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </>
  )
}
