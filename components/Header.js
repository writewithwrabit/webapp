import { useStoreState } from 'easy-peasy'
import Link from 'next/link'

import LogoName from '../public/logos/name.svg'

const Header = () => {
  const user = useStoreState((state) => state.user)

  return (
    <header className="relative px-4 lg:px-20">
      <nav id="nav" className="py-6 lg:py-10 flex justify-between items-center">
        <Link href="/">
          <a>
            <LogoName className="w-24 md:w-32" />
          </a>
        </Link>
      </nav>
    </header>
  )
}

export default Header
