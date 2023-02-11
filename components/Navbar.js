import Link from "next/link";

const Navbar = () => {
  return (
    <div >
            <ul className=" pt-24 flex justify-end pr-8  ">
              <li>
                <Link className=" bg-none font-serif italic text-slate-500 p-3 m-2" href="/gallery">Weddings</Link>
              </li>
              <li>
                <Link className=" bg-none font-serif italic text-slate-500 p-3 m-1" href="/gallery">Engagement</Link>
              </li>
              <li>
                <Link className=" bg-none font-serif italic text-slate-500 p-3 m-1" href="/despre-noi">About</Link>
              </li>
              <li>
                <Link className=" bg-none font-serif italic text-slate-500  p-3 m-1" href="/despre-noi">Contact</Link>
              </li>
              <li>
                <Link className=" bg-none font-serif italic text-slate-500 p-3 m-1" href="/despre-noi">Client</Link>
              </li>
            </ul>
          </div>
  );
}

export default Navbar;