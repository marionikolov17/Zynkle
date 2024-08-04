import { useNavigate } from "react-router-dom";
import * as postService from "./../services/post.service";

export default function useDeletePost() {
    const navigate = useNavigate();

    const deletePost = async (postId) => {
        try {
            await postService.deletePost(postId);

            navigate('/profile');
        } catch (error) {
            throw new Error(error.response.data.data.message);
        }
    }

    return deletePost;
}