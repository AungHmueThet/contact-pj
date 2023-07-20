import { Button, Loader, Table, TextInput } from "@mantine/core";
import React, { useEffect } from "react";
import {
    useDeleteContactMutation,
    useGetContactQuery,
} from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchTerm } from "../redux/services/contactSlice";
import { Menu, rem } from "@mantine/core";
import Swal from "sweetalert2";

const ContactTable = () => {
    const token = Cookies.get("token");
    const { data, isLoading } = useGetContactQuery(token);
    const contacts = useSelector((state) => state.contactSlice.contacts);
    const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
    const [deleteContact] = useDeleteContactMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addContacts(data?.contacts?.data))
    },[data])

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                const { data } = await deleteContact({ id, token });
                console.log(data);
            }
        });
    };

 
    // const rows = contacts
    //     ?.filter((item) => {
    //         if (searchTerm === "") {
    //             return item;
    //         } else if (
    //             item?.name
    //                 .toLowerCase()
    //                 .includes(searchTerm?.toLocaleLowerCase())
    //         ) {
    //             return item;
    //         }

    //     })
    //     .map((contact) => (
    //         <tr key={contact?.id}>
    //             <td>{contact?.name}</td>
    //             <td>
    //                 {contact?.email === null
    //                     ? "example@gmail.com"
    //                     : contact?.email}
    //             </td>
    //             <td>{contact?.phone}</td>
    //             <td>
    //                 {contact?.address === null
    //                     ? "example Address"
    //                     : contact?.address}
    //             </td>
    //             <td>
    //                 <p
    //                     onClick={() => deleteHandler(contact?.id)}
    //                     className=" cursor-pointer text-red-500"
    //                 >
    //                     Delete
    //                 </p>

    //                 <Link to={`/user/${contact?.id}`}>
    //                     <p>User Info</p>
    //                 </Link>
    //             </td>
    //         </tr>
    //     ));

    if (isLoading) {
        return (
            <div className=" flex justify-center items-center h-screen">
                <Loader color="violet" size="xl" variant="bars" />
            </div>
        );
    }
    return (
        <>
            <div className=" flex gap-3 items-center">
                <Link to={"/create"}>
                    <Button
                        className=" bg-blue-500 px-4 py-1 my-5 ms-4"
                        type="submit"
                    >
                        Create contact
                    </Button>
                </Link>
                <TextInput
                    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                    value={searchTerm}
                    placeholder="Search"
                    radius="md"
                    withAsterisk
                />
            </div>
            <div className=" mt-20">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts
                            ?.filter((item) => {
                                if (searchTerm === "") {
                                    return item;
                                } else if (
                                    item?.name
                                        .toLowerCase()
                                        .includes(
                                            searchTerm?.toLocaleLowerCase()
                                        )
                                ) {
                                    return item;
                                }
                            })
                            .map((contact) => (
                                <tr key={contact?.id}>
                                    <td>{contact?.name}</td>
                                    <td>
                                        {contact?.email === null
                                            ? "example@gmail.com"
                                            : contact?.email}
                                    </td>
                                    <td>{contact?.phone}</td>
                                    <td>
                                        {contact?.address === null
                                            ? "example Address"
                                            : contact?.address}
                                    </td>
                                    <td>
                                        <p
                                            onClick={() =>
                                                deleteHandler(contact?.id)
                                            }
                                            className=" cursor-pointer text-red-500"
                                        >
                                            Delete
                                        </p>

                                        <Link to={`/user/${contact?.id}`}>
                                            <p>User Info</p>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default ContactTable;
