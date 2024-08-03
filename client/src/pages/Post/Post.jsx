import { useParams } from "react-router-dom";
import { useGetPost } from "../../entities/posts/hooks/usePost";
import DesktopPost from "./DesktopPost/DesktopPost";
import MobilePost from "./MobilePost/MobilePost";
import PostContext from "../../entities/posts/contexts/post.context";

export default function Post() {
  const { postId } = useParams();
  const { post, loading, error, onLike, onDislike, onSave, onUnsave } =
    useGetPost(postId);

  return (
    <PostContext.Provider
      value={{ post, loading, error, onLike, onDislike, onSave, onUnsave }}
    >
      <DesktopPost />
      <MobilePost />
    </PostContext.Provider>
  );
}
