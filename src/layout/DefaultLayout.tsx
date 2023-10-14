import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { Toaster, toast } from "sonner"
import DefaultHeader from "./components/DefaultHeader";

type NotiMsg = {
  title : string;
  message : string;
  status : number
}


const DefaultLayout = () => {


  const navigate = useNavigate();

    const token = useSelector((state : RootState) => state.token);
    const NotiMsg : NotiMsg = useSelector((state : RootState) => state.noti);

    useEffect(() => {   
        // localStorage.clear();
        // if(token?.token?.access_token !== undefined | token?.token?.access_token !== null | token?.token?.access_token !== ''){
        //     setTimeout(() => {
        //         localStorage.clear();
        //         navigate('/auth/login')
        //     }, 3600000);
        // }

        if(token?.token?.access_token === undefined) {
            console.log(token?.token?.access_token);
            navigate('/auth/login')
        }else {
                navigate('/')
        }

    }, [])

    useEffect(() => {
      if(NotiMsg?.status === 200 || NotiMsg?.message !== "" || NotiMsg?.message !== null){
        
        toast.success(NotiMsg?.message)
      }
    }, [NotiMsg])

    useEffect(() => {
        const handleTabClose = () => {
            localStorage.clear();
        };
    
        window.addEventListener('beforeunload', handleTabClose);
    
        return () => {
          window.removeEventListener('beforeunload', handleTabClose);
        };
      }, []);


  return (
    <>
      {
        token && (
          <>
          <DefaultHeader />
          <Toaster richColors position="bottom-right" />
          <Outlet />
          </>
        )
      }
    
    </>
  )
}

export default DefaultLayout