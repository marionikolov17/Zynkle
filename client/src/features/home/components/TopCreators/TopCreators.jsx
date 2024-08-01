import TopCreator from "../TopCreator/TopCreator";

export default function TopCreators() {
  return (
    <>
      <h3 className="md:hidden lg:block ms-6 font-bold text-lg mb-2">
        Top Creators
      </h3>
      {/* <p className="ms-6 mt-1 text-sm">There are no top creators.</p> */}
      <TopCreator />
      <TopCreator />
    </>
  );
}
