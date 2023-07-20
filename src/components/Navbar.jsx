import React from "react";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeUser } from "../redux/services/authSlice";
import { Loader } from "@mantine/core";
import ContactTable from "./ContactTable";

const Navbar = () => {
    const user = JSON.parse(Cookies.get("user"));
    const token = Cookies.get("token");
    const nav = useNavigate();
    const dispatch = useDispatch();

    const [logout, { isLoading }] = useLogoutMutation();

    const logoutHandler = async (e) => {
        const { data } = await logout(token);
        dispatch(removeUser());
        console.log("🚀 ~ file: Navbar.jsx:14 ~ logoutHandler ~ data:", data);
        if (data?.success) nav("/login");
    };
    if (isLoading) {
        return (
            <div className=" flex justify-center items-center h-screen">
                <Loader color="violet" size="xl" variant="bars" />
            </div>
        );
    }
    return (
        <div className=" flex justify-around shadow-lg items-center p-7">
            <Link to={"/"}>
                <h2 className=" text-2xl font-semibold text-gray-700">MMS</h2>
            </Link>
            <div className=" flex items-center gap-5">
                <div className=" flex flex-col gap-3">
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                </div>
                <button
                    onClick={logoutHandler}
                    className=" bg-red-600 text-white px-4 py-1"
                >
                    Logout
                </button>
            </div>
        </div>
    );
    
};

export default Navbar;
