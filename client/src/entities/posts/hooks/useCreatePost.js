import { useNavigate } from "react-router-dom";
import * as postService from "./../services/post.service";

export default function useCreatePost() {
    const navigate = useNavigate();

    const createPost = async (data) => {
        try {
            await postService.createPost(data);

            navigate('/profile');
        } catch (error) {
            throw new Error(error.response.data.data.message);
        }
    }

    return createPost;
}