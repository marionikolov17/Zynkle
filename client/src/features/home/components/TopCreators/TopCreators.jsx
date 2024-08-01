import useGetTopCreators from "../../../../entities/users/hooks/useGetTopCreators";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import TopCreator from "../TopCreator/TopCreator";

export default function TopCreators() {
  const {creators, error, isLoading} = useGetTopCreators();

  return (
    <>
      {error && <ErrorToast text="Could not get top creators"/>}
      {isLoading &&
      <div className="w-full flex justify-center mt-10">
        <div className="loader"></div>
      </div>
      }
      <h3 className="md:hidden lg:block ms-6 font-bold text-lg mb-2">
        Top Creators
      </h3>
      {creators?.length == 0 && <p className="ms-6 mt-1 text-sm">There are no top creators.</p> }
      {/* <p className="ms-6 mt-1 text-sm">There are no top creators.</p> */}
      {creators?.map(creator => <TopCreator key={creator?._id} creator={creator}/>)}
    </>
  );
}
