import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";

const Register = () => {
 
    const [register,{isLoading,isFetching}] = useRegisterMutation();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        validate: {
            name: (value) =>
                value.length < 2 ? "Name must have at least 2 letters" : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value) =>
                value.length < 8 ? "Password must have 8..." : null,
        },
    });

    const nav = useNavigate();

    // const registerHandler = async (e) => {
    //     try {
    //         e.preventDefault();
    //         const user = { name, password, password_confirmation, email };
    //         const { data } = await register(user);
    //         console.log(data);
    //         if (data?.success === true) {
    //             nav("/login");
    //         }
    //     } catch (error) {
    //         console.log(
    //             "🚀 ~ file: Register.jsx:25 ~ registerHandler ~ error:",
    //             error
    //         );
    //     }
    // }
    
    if (isLoading) {
        return(
            <div className=" flex justify-center items-center h-screen">
                <Loader color="violet" size="xl" variant="bars" />
            </div>
        )
    }
    return (
        <div className=" flex justify-center items-center h-screen">
            <form
                onSubmit={form.onSubmit(async (values) => {
                    try {
                        const { data } = await register(values);
                        console.log(data);
                        if (data?.success === true) {
                            nav("/login");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })}
                className=" w-96 flex flex-col gap-10 shadow-lg p-7"
            >
                <h2 className=" text-gray-500 text-2xl font-medium">
                    Register
                </h2>
                <TextInput
                    name="name"
                    {...form.getInputProps("name")}
                    placeholder="Enter your name..."
                />
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
                <PasswordInput
                    name=" password_confirmation"
                    {...form.getInputProps("password_confirmation")}
                    placeholder="Password confirm..."
                />
                <Button className=" bg-blue-500 px-4 py-1" type="submit">
                    Sign up
                </Button>
                <div className=" flex gap-3">
                    <p className=" select-none text-gray-700 ">
                        Already have an account?
                    </p>
                    <Link to={"/login"}>
                        <p className=" cursor-pointer select-none text-blue-500 font-semibold ">
                            Login now
                        </p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
