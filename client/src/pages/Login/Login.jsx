import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useState } from "react";

import FormErrorMessage from "../../shared/components/FormErrorMessage/FormErrorMessage";
import useLogin from "../../entities/users/hooks/useLogin";
import Loader from "../../shared/components/Loader/Loader";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const { login } = useLogin();

  const [isLoading, setIsLoading] = useState(false);
  const [hasLoginError, setHasLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
    } catch (error) {
      setHasLoginError(true);
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <main className="min-h-full w-full absolute top-0 flex justify-center items-center font-montserrat bg-mainWhite">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center font-bold text-4xl">Zy<span className="text-mainGreen">n</span>kle</h1>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", { required: "This field is required" })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && <FormErrorMessage message={errors.email.message}/>}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", { required: "This field is required" })}
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <FormErrorMessage message={errors.password.message}/>}
                </div>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-mainGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm disabled-button"
                >
                  Sign in
                </button>
                {hasLoginError && <FormErrorMessage className="text-center mt-2" message={loginError} />}
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-mainGreen hover:opacity-90"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
