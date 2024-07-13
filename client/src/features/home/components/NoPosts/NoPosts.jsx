export default function NoPosts() {
    return (
        <div className="w-full flex justify-center mt-3 mb-8 sm:mb-5">
            <div className="w-[50%] grow p-4 flex flex-col items-center justify-center">
                <img className="w-24 sm:w-32" src="./images/no-post-panda.png" alt="" />
                <p className="mt-2 font-bold text-sm sm:text-lg text-center">Oops... There are no more posts, yet.</p>
            </div>
        </div>
    )
}