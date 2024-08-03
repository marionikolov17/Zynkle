import { useForm } from "react-hook-form";
import useCreateComment from "../../../../entities/comments/hooks/useCreateComment";
import { useState } from "react";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function AddCommentForm({ onCreateComment, postId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const user = useSelector(state => state.user);

  const {
    register,
    handleSubmit,
    setValue
  } = useForm();

  const createComment = useCreateComment();

  const handleCreateComment = async (data) => {
    setIsLoading(true);
    try {
      const comment = await createComment(postId, data);

      onCreateComment({...comment, creator: { _id: user._id, username: user.username, profilePicture: user.profilePicture }});
      setValue("text", "");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {error && <ErrorToast text={error}/>}
      <form className="w-full flex px-4 py-3" onSubmit={handleSubmit(handleCreateComment)}>
        <input
          type="text"
          className="grow max-w-full outline-none text-sm bg-transparent"
          name="commentInput"
          {...register("text")}
          id="commentInput"
          placeholder="Add comment..."
          required
        />
        <button type="submit" className="grow-0 shrink max-w-max text-sm text-mainGreen disabled:text-slate-400" disabled={isLoading}>
          Comment
        </button>
      </form>
    </>
  );
}
