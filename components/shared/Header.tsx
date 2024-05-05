import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper  flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image 
          src="/assets/images/logo.png" width={60} height={20}
          alt="Logo"
          />
        </Link>

      
          <nav className="md:flex-between hidden w-full max-w-xs">
              <NavItems/>
          </nav>
        

        <div className="flex w-80 justify-end">
          <SignedIn>
            <Link href="/dashboard" className="md:flex-between hidden max-w-xs mr-2 p-medium-16 whitespace-nowrap">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        

          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">
                Login
              </Link>
            </Button> 
          </SignedOut>
          <MobileNav/>

          
        </div>
      </div>
    </header>
  )
}

export default Header