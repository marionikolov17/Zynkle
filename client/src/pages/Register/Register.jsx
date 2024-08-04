import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../../shared/components/FormErrorMessage/FormErrorMessage";
import useRegister from "../../entities/users/hooks/useRegister";
import { useState } from "react";
import Loader from "../../shared/components/Loader/Loader";
import { useSelector } from "react-redux";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const user = useSelector(state => state.user);

    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm();

    const handleRegister = useRegister();

    const onRegister = async (data) => {
      setIsLoading(true);
      try {
        await handleRegister(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <>
        {user.isAuthenticated && <Navigate to="/"/>}
        {isLoading && <Loader />}
        <main className="min-h-full w-full absolute top-0 flex justify-center items-center font-montserrat bg-mainWhite">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="text-center font-bold text-4xl">Zy<span className="text-mainGreen">n</span>kle</h1>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create an account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit(onRegister)} className="space-y-6">
              <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      {...register("username", { required: "This field is required" })}
                      type="text"
                      autoComplete="username"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.username && <FormErrorMessage message={errors.username.message}/>}
                </div>

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
                      name="email"
                      {...register("email", { required: "This field is required" })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.email && <FormErrorMessage message={errors.email.message}/>}
                </div>
    
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                            id="first-name"
                            name="first-name"
                            {...register("firstName", { required: "This field is required" })}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errors.firstName && <FormErrorMessage message={errors.firstName.message}/>}
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                            id="last-name"
                            name="last-name"
                            {...register("lastName", { required: "This field is required" })}
                            type="text"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {errors.lastName && <FormErrorMessage message={errors.lastName.message}/>}
                    </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      {...register("password", { required: "This field is required" })}
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.password && <FormErrorMessage message={errors.password.message}/>}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="rePassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="rePassword"
                      name="rePassword"
                      type="password"
                      {...register("rePassword", { required: "This field is required" })}
                      autoComplete="rePassword"
                      className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.rePassword && <FormErrorMessage message={errors.rePassword.message}/>}
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-mainGreen px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                  >
                    Register
                  </button>
                  {error && <FormErrorMessage className="text-center mt-4" message={error}/>}
                </div>
              </form>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-mainGreen hover:opacity-90"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
      </>
      );
}