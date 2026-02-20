import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authslice";


const formSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginMutation = useLogin({
     onSuccess: (data:any) => {
      // Save user + token to Redux
     data = data.data
      dispatch(setCredentials({ user: data.user, token: data.token }));
    },
  }); 

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await loginMutation.mutateAsync(data);

      toast("Logged in Successfully");

      form.reset();
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid Credentials");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to continue.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} placeholder="you@example.com" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input type="password" {...field} placeholder="••••••••" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" form="login-form" className="w-full">
            Sign In
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary cursor-pointer">
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
