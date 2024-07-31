import useFetch from "../../../shared/hooks/useFetch";

export default function useProfile(currentUser, userId) {
    const { data, loading, error } = useFetch("users/" + userId ? userId : currentUser._id);

    return { profileInfo: data, loading, error }
}