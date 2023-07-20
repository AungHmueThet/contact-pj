import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const UserInfo = () => {
    const { id } = useParams();
    const token = Cookies.get("token");
    const { data } = useGetSingleContactQuery({ id, token });
    console.log(data);
    return (
        <div className=" flex justify-center items-center h-screen">
            <div className=" flex flex-col gap-3 shadow-lg p-7">
                <img src="https://t3.ftcdn.net/jpg/05/11/52/90/360_F_511529094_PISGWTmlfmBu1g4nocqdVKaHBnzMDWrN.jpg" alt="" />
                <p>{data?.contact?.name}</p>
                <p>{data?.contact?.email}</p>
                <p>{data?.contact?.phone}</p>
                <p>{data?.contact?.address}</p>
                <Link to={-1}>
                <button className=" px-5 py-1 bg-teal-500 text-white">Back</button>
                </Link>
            </div>
        </div>
    );
};

export default UserInfo;
