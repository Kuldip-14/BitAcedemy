import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({ name: "", email: "", password: "" });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerSuccess }] = useRegisterUserMutation();
  const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginSuccess }] = useLoginUserMutation();

  const navigate = useNavigate();
  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);

  const changeHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toast.success(registerData.message || "Signup successful");
    }
    if (registerError) {
      toast.error(registerError.data?.message || "Signup Failed");
    }
    if (loginSuccess && loginData) {
      toast.success(loginData.message || "Login successful");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data?.message || "Login Failed");
    }
  }, [registerSuccess, registerData, registerError, loginSuccess, loginData, loginError, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Tabs defaultValue="login" className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
        <TabsList className="grid grid-cols-2 gap-2 bg-gray-200 dark:bg-gray-700 rounded-xl p-1">
          <TabsTrigger value="signup" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all">
            Signup
          </TabsTrigger>
          <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm data-[state=active]:font-semibold transition-all">
            Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Signup</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Create a new account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input type="text" name="name" value={signupInput.name} onChange={(e) => changeHandler(e, "signup")} placeholder="Eg: John Doe" required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={signupInput.email} onChange={(e) => changeHandler(e, "signup")} placeholder="Eg: john@example.com" required />
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input type={showPasswordSignup ? "text" : "password"} name="password" value={signupInput.password} onChange={(e) => changeHandler(e, "signup")} placeholder="Enter your password" required />
                  <button type="button" className="absolute right-2 top-2 text-gray-500 dark:text-gray-300" onClick={() => setShowPasswordSignup(!showPasswordSignup)}>
                    {showPasswordSignup ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full transition-all" disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {registerIsLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Signup"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Login</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Enter your credentials to login.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={loginInput.email} onChange={(e) => changeHandler(e, "login")} placeholder="Eg: john@example.com" required />
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input type={showPasswordLogin ? "text" : "password"} name="password" value={loginInput.password} onChange={(e) => changeHandler(e, "login")} placeholder="Enter your password" required />
                  <button type="button" className="absolute right-2 top-2 text-gray-500 dark:text-gray-300" onClick={() => setShowPasswordLogin(!showPasswordLogin)}>
                    {showPasswordLogin ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full transition-all" disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {loginIsLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
