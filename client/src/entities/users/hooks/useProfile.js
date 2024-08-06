import { useEffect, useState } from "react";
import * as userService from "../services/user.service";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useGetProfile(userId) {
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

          setUser(response.data.data.user);
        } catch (error) {
          navigate("/404");
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [isAuthenticated, userId, navigate]);

  const updateOnFollow = (followerId) => {
    setUser(currentUser => {
      const newUser = {...currentUser};
      let currentFollowers = newUser.followers;
      currentFollowers.push(followerId);
      newUser.followers = currentFollowers;
      return newUser;
    });
  }

  const updateOnUnfollow = (followerId) => {
    setUser(currentUser => {
      const newUser = {...currentUser};
      let currentFollowers = newUser.followers.filter(id => id != followerId);
      newUser.followers = currentFollowers;
      return newUser;
    })
  }

  return { user, isLoading, updateOnFollow, updateOnUnfollow };
}

export function useFollowProfile() {
  const follow = async (userId) => {
    try {
      await userService.followUser(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  return follow;
}

export function useUnfollowProfile() {
  const unfollow = async (userId) => {
    try {
      await userService.unfollowUser(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  return unfollow;
}