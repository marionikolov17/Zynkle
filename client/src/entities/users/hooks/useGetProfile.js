import { useEffect, useState } from "react";
import * as userService from "./../services/user.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useGetProfile(userId) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (isAuthenticated) {
        try {
          const response = await userService.getUser(userId);

          console.log(response.data.data.user);
          setUser(response.data.data.user);
        } catch (error) {
          navigate('/404')
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [isAuthenticated, userId, navigate]);

  return { user, isLoading };
}
