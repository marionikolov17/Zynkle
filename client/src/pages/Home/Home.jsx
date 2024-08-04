import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import HomePost from "../../features/home/components/HomePost/HomePost";
import NoPosts from "../../features/home/components/NoPosts/NoPosts";
import ProfilePicture from "../../shared/components/ProfilePicture/ProfilePicture";
import TopCreators from "../../features/home/components/TopCreators/TopCreators";
import { useCallback, useRef, useState } from "react";
import useGetPosts from "../../entities/posts/hooks/useGetPosts";
import ErrorToast from "../../shared/components/ErrorToast/ErrorToast";

export default function Home() {
  const user = useSelector(state => state.user);

  const [pageNumber, setPageNumber] = useState(0);

  const {
    posts,
    loading,
    error,
    setError,
    hasMore
  } = useGetPosts(pageNumber);

  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore])

  return (
    <>
      {error && <ErrorToast error={error} setError={setError}/>}
      {/* Content section */}
      <section className="max-h-max min-h-full flex-auto grow lg:border-e-2 border-slate-200 block overflow-x-hidden overflow-y-scroll no-scrollbar">
        <header className="flex justify-center py-10 border-b-2 sm:border-b-0">
          <Link to="/create" className="flex text-lg sm:text-xl text-mainGreen py-2 px-10 border-mainGreen border-2 rounded-lg">
            <CiCirclePlus className="my-auto" />
            <p className="my-auto ms-2">Create a new post</p>
          </Link>
        </header>
        <div className="block">
          {/* Posts wrapper */}
          {loading && 
            <div className="w-full flex justify-center">
              <div className="loader"></div>
            </div>
          }
          {posts.map((post, index) => {
            if (posts?.length == index + 1) {
              return <HomePost innerRef={lastPostElementRef} key={index} post={post}/>
            }
            return <HomePost key={index} post={post}/>
          })}
          {!hasMore && <NoPosts />}
        </div>
      </section>
      <section className="hidden lg:block flex-auto shrink grow-0 w-[25%] sticky top-0">
        <div className="flex p-6 mt-4">
          <ProfilePicture className="w-12 h-12" imageUrl={user.profilePicture} />
          <div className="block ms-2">
            <Link to="/profile" className="my-auto text-sm font-bold">{user.username}</Link>
            <p className="my-auto text-sm opacity-60">{user.firstName + " " + user.lastName}</p>
          </div>
        </div>
        <TopCreators />
      </section>
    </>
  );
}
