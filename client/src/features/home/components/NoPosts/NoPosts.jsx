export default function NoPosts() {
    return (
        <div className="w-full flex justify-center mt-3 mb-5">
            <div className="w-[50%] shrink p-4 flex flex-col items-center justify-center">
                <img className="w-32" src="./images/no-post-panda.png" alt="" />
                <p className="mt-2 font-bold text-lg">Oops... There are no more posts, yet.</p>
            </div>
        </div>
    )
}