import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const Login = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [responeError, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/dashboard/allprojects";

    const onSubmit = async (values) => {

        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)

        }).then((res) => {
            if (!res.ok) {
                throw new Error('API ERROR');
            }
            return res.json();
        }).then((data) => {
            if (data.success) {
                localStorage.setItem("token", data?.data?.accessToken);
                toast.success(data?.message);
                navigate(from, { replace: true });

                reset();
            }
        }).catch((error) => {
            setError(error?.message);
            toast.error(error?.message);
        })


    }
    return (
        <>
            <section className="relative flex flex-wrap lg:h-screen lg:items-center w-full bg-gradient-to-br from-black via-gray-900 to-gray-800">
                <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-lg text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-900/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Welcome back!
                        </h1>

                        <p className="mt-4 text-gray-400">
                            Sign in to continue managing your projects and pick up right where you left off.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mb-0 mt-8 max-w-md space-y-5">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 pe-12 text-sm text-white placeholder-gray-500 shadow-sm backdrop-blur-sm transition focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    placeholder="Enter email"
                                    {...register("email", { required: "Email Address is required" })}
                                    required
                                />
                                {errors.email && (
                                    <p role="alert" className="mt-1.5 text-xs text-red-400">
                                        {errors.email.message}
                                    </p>
                                )}
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 pe-12 text-sm text-white placeholder-gray-500 shadow-sm backdrop-blur-sm transition focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                                    placeholder="Enter password"
                                    {...register("password", { required: "Password is Required" })}
                                    required
                                />
                                {errors.password && (
                                    <p role="alert" className="mt-1.5 text-xs text-red-400">
                                        {errors.password.message}
                                    </p>
                                )}
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 text-gray-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <p className="text-sm text-gray-400">
                                No account?{' '}
                                <Link className="font-medium text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline" to='/register'>
                                    Sign up
                                </Link>
                            </p>

                            <button
                                type="submit"
                                className="inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition hover:shadow-purple-900/50 hover:brightness-110 active:scale-95"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {responeError && (
                        <div className="mx-auto mt-4 max-w-md rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 backdrop-blur-sm">
                            User Not Exist {responeError}
                        </div>
                    )}
                </div>

                <div className="relative w-full sm:h-96 lg:h-full lg:w-1/2 h-screen">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                    <img
                        alt="..."
                        src="https://enwpgo.files.wordpress.com/2023/02/web-design-portfolio-header.jpg"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>
        </>
    );
};

export default Login;