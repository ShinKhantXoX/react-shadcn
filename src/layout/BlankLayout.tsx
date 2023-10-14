import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"


const BlankLayout = () => {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Outlet />
    </>
  )
}

export default BlankLayout