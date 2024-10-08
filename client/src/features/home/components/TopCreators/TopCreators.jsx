import useGetTopCreators from "../../../../entities/users/hooks/useGetTopCreators";
import ErrorToast from "../../../../shared/components/ErrorToast/ErrorToast";
import TopCreator from "../TopCreator/TopCreator";

export default function TopCreators() {
  const {creators, error, setError, isLoading} = useGetTopCreators();

  return (
    <>
      {error && <ErrorToast error="Could not get top creators" setError={setError}/>}
      {isLoading &&
      <div className="w-full flex justify-center mt-10">
        <div className="loader"></div>
      </div>
      }
      <div className="bg-white p-4 mt-4 rounded-lg shadow w-full">
        <h3 className="md:hidden lg:block font-bold text-lg mb-2">
          Top Creators
        </h3>
        {creators?.length == 0 && <p className="mt-1 text-sm">There are no top creators.</p> }
        {/* <p className="ms-6 mt-1 text-sm">There are no top creators.</p> */}
        {creators?.map(creator => <TopCreator key={creator?._id} creator={creator}/>)}
      </div>
    </>
  );
}
