/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import { BsSend } from "react-icons/bs";

export default function ReplyForm({ setReplies }) {
    const {
        register,
        handleSubmit
    } = useForm();

    const handleCreateReply = async (data) => {}

    return (
        <form className="w-full px-6 py-2" onSubmit={handleSubmit(handleCreateReply)}>
            <div className="flex relative w-full shadow-sm ring-1 ring-mainGreen rounded-lg">
                <input 
                    type="text" 
                    {...register("text")}
                    className="text-sm outline-none py-1 px-3 grow bg-transparent"
                    placeholder="Add reply..."
                    required
                />
                <button type="submit" className="py-2 pe-4">
                    <BsSend className="hover:text-mainGreen"/>
                </button>
            </div>
        </form>
    )
}