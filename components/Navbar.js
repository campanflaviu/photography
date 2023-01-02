import Link from "next/link";

const Navbar = () => {
  return (<div>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/gallery">Gallery</Link></li>
      <li><Link href="/despre-noi">Despre Noi</Link></li>
    </ul>
  </div>);
}

export default Navbar;