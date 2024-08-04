import { useEffect, useState } from "react";
import * as userService from "./../services/user.service";

export default function useGetTopCreators() {
  const [creators, setCreators] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await userService.getTopCreators();

        //console.log(response.data.data.users);
        setCreators(response.data.data.users);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { creators, error, setError, isLoading };
}
