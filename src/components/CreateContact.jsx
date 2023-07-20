import { Button, NumberInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../redux/api/contactApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CreateContact = () => {
    const token = Cookies.get("token");
    const [createContact, { isLoading }] = useCreateContactMutation();
    const nav = useNavigate();
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
        validate: {
            name: (value) =>
                value.length < 2 ? "Name must have at least 2 letters" : null,
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            // phone: hasLength({ min: 9, max: 11 }),
            address: (value) =>
                value.length < 5
                    ? "address must have at least 5 letters"
                    : null,
        },
    });
    return (
        <div className=" flex justify-center items-center h-screen bg-violet-200">
            <form
                onSubmit={form.onSubmit(async (values) => {
                    try {
                        const { data } = await createContact({
                            token,
                            data: values,
                        });
                        console.log(values);
                        console.log(data);
                        if (data?.success) {
                            nav("/");
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })}
                className=" w-96 flex flex-col gap-10 shadow-lg p-7"
            >
                <h2 className=" text-gray-500 text-2xl font-medium">
                    Create contact
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
                <NumberInput
                    name="phone"
                    {...form.getInputProps("phone")}
                    placeholder="Enter your phone..."
                />
                <TextInput
                    name="address"
                    {...form.getInputProps("address")}
                    placeholder="Enter your address..."
                />

                <Button
                    loading={isLoading && true}
                    className=" bg-blue-500 px-4 py-1"
                    type="submit"
                >
                    Create
                </Button>
            </form>
        </div>
    );
};

export default CreateContact;
