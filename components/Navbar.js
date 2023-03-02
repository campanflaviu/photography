import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const activeButton = "hover:font-semibold font-semibold  bg-none font-serif italic text-slate-500 p-3 m-2"
  const nonActiveButton = "hover:font-semibold bg-none font-serif italic text-slate-500 p-3 m-2"
  const router = useRouter();
  
  
  return (
    <div >
      <ul className=" pt-24 flex justify-end pr-8  ">
        <li>
            <Link
              className={router.route === "/gallery" || router.route.includes('/album/') ? activeButton : nonActiveButton}
              href="/gallery"
            >Weddings</Link>
        </li>
        <li>
          {router.route === "/engagement" ?
            <Link className={activeButton} href="/engagement">Engagement</Link>
            : <Link className={nonActiveButton} href="/engagement">Engagement</Link>}
        </li>
        <li>
          {router.route === "/despre-noi" ?
            <Link className={activeButton} href="/despre-noi">About</Link>
            : <Link className={nonActiveButton} href="/despre-noi">About</Link>}
        </li>
        <li>
          {router.route === "/contact" ?
            <Link className={activeButton} href="/contact">Contact</Link>
            : <Link className={nonActiveButton} href="/contact">Contact</Link>}
        </li>
        <li>
        {router.route === "/client" ?
            <Link className={activeButton} href="/client">Client</Link>
            : <Link className={nonActiveButton} href="/client">Client</Link>}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;