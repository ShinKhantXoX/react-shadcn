import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateNotification } from "@/redux/notificationSlice"
import { setTokenRed } from "@/redux/tokenSlice"
import { postRequest } from "@/services/apiService"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [payload, setPayload] = useState({
    email: 'admin@gmail.com',
    password: 'asdffdsa'
  });


  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null;

  const submitLogin = async () => {
    setLoading(true);
    setErrors(null);

    const response = await postRequest('/login', {
      email: 'admin@gmail.com',
      password: 'asdffdsa'
    });

    if (response && response.errors) {
      setErrors(response.errors);
      setLoading(false);
      return;
    }

    if (response && (response.status === 401 || response.status === 500 || response.status === 403)) {
      // dispatch(updateNotification({
      //   title: "Login Fail",
      //   message: response.message,
      //   status: 'fail'
      // }));
      setErrors(response.errors)
      setLoading(false);
      return;
    }

    if (response && (response.status === 422)) {
      // dispatch(updateNotification({
      //   title: "Login Fail",
      //   message: response.message,
      //   status: 'fail'
      // }));
      console.log(response);
      setErrors(response.message)
      setLoading(false);
      return;
    }

    if (response && response.status === 200) {
      localStorage.setItem('token', JSON.stringify(response.data))
      dispatch(updateNotification({
        title: "Login Success",
        message: response.message,
        status: response.status,
        // token : response.data.access_token
      }));
      dispatch(setTokenRed({
        token: response.data
      }))
      setLoading(false);
      if (token !== undefined || token !== null) {
        navigate("/")
      }
    }
  }


  useEffect(() => {
    setPayload({
      email: email,
      password: password,
    })

  }, [email, password])

  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <Card className=" w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Pannel is need to be Admin access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className=" pb-3">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
            <Label htmlFor="password" className=" pb-3">Password</Label>
            <Input type="password" id="password" placeholder="Enter your password" />
          </div>
        </CardContent>
        <CardFooter>
          <div className=" w-full flex items-center justify-end">
            <Button 
            onClick={() => submitLogin()}
            disabled={loading}
            >{loading ? <img className=" w-5 h-5" src="/loading.svg" alt="" /> : "Save"}</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login