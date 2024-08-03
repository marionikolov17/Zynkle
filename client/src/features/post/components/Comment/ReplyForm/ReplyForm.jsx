/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import PostContext from "../../../../../entities/posts/contexts/post.context";

import { BsSend } from "react-icons/bs";
import useCreateReply from "../../../../../entities/replies/hooks/useCreateReply";
import ErrorToast from "../../../../../shared/components/ErrorToast/ErrorToast";

export default function ReplyForm({ setReplies, commentId, setShowReplyForm, setTotalReplies }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const user = useSelector(state => state.user);

    const { post } = useContext(PostContext);

    const {
        register,
        handleSubmit,
        setValue
    } = useForm();

    const { createReply, onCreateReply } = useCreateReply();

    const handleCreateReply = async (data) => {
        setIsLoading(true);

        try {
            const reply = await createReply(data, post?._id, commentId);

            onCreateReply(setReplies, reply, user);

            // Clear and hide form
            setValue("text", "");
            setShowReplyForm(false);

            //Increase total replies length
            setTotalReplies(currentValue => currentValue + 1);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {isLoading &&
                <div className="w-full flex justify-center">
                    <div className="loader"></div>
                </div>
            }
            {error && <ErrorToast text={error}/>}
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
        </>
    )
}