
import Head from 'next/head'
import Link from 'next/link';
import Main from '../layouts/main';


export default function Home() {
  return (
    <Main>
      <Head>
        <title >Home Page</title>
      </Head>
      <div className="bg-gray-500">
        main indeasdasdx
        <Link href="/despre-noi">Despre Noi</Link>
      </div>
    </Main>
  )
}
