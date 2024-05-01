const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex-center min-h-screen w-full 
    bg-[url('/assets/images/SignUp.svg')] bg-cover bg-fixed bg-center">
      {children}
    </div>
  )
}

export default layout