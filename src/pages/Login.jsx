import {
    Button,
    Loader,
    LoadingOverlay,
    PasswordInput,
    TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { useForm } from "@mantine/form";

const Login = () => {
    const dispatch = useDispatch();

    const [login, { isLoading  }] = useLoginMutation();

    const nav = useNavigate();

    // const loginHandler = async (e) => {
    //     try {
    //         e.preventDefault();
    //         const user = { email, password };
    //         const { data } = await login(user);
    //         console.log("🚀 ~ file: Login.jsx:27 ~ loginHandler ~ data:", data)
    //         dispatch(addUser({ user: data?.user, token: data?.token }));
    //         if (data?.success) nav("/");
    //     } catch (error) {
    //         console.log(
    //             "🚀 ~ file: Login.jsx:26 ~ loginHandler ~ error:",
    //             error
    //         );
    //     }
    // };

    const form = useForm({
        initialValues: {
            email: "lextor@gmail.com",
            password: "qqqqqqqq",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                value.length < 8 ? "Password must have 8..." : null,
        },
    });
    return (
        <div className=" flex justify-center items-center h-screen bg-violet-200"> 
            <form
                onSubmit={form.onSubmit(async (values) => {
                    try {
                        const { data } = await login(values);
                        dispatch(
                            addUser({ user: data?.user, token: data?.token })
                        );

                        console.log(data);
                        if (data?.success) nav("/");
                    } catch (error) {
                        console.log(error);
                    }
                })}
                className=" w-96 flex flex-col gap-10 shadow-lg p-7"
            >
                <h2 className=" text-gray-500 text-2xl font-medium">Login</h2>
                <TextInput
                    name="email"
                    {...form.getInputProps("email")}
                    placeholder="Enter your email..."
                />

                <PasswordInput
                    name="password"
                    {...form.getInputProps("password")}
                    placeholder="Enter your password..."
                />

                <Button
                    loading={isLoading && true}
                    className=" bg-blue-500 px-4 py-1"
                    type="submit"
                >
                    Sign in
                </Button>

                <div className=" flex gap-3">
                    <p className=" select-none text-gray-700 ">Not a member?</p>
                    <Link to={"/register"}>
                        <p className=" cursor-pointer select-none text-blue-500 font-semibold ">
                            Sign up now
                        </p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
