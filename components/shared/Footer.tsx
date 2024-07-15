import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex 
      flex-col gap-4 p-5 text-center sm:flex-row">
        <div className="flex items-center">
        <Link href="/">
          <Image 
          src="/assets/images/logo.svg"
          alt="logo"
          width={50} height={50}/>
        </Link>
        <h1 className="font-bold">
          Hope Foundation
        </h1>
        </div>

        <p>2023 Hope Foundation. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
