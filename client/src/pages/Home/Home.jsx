import { Link } from "react-router-dom"
import { CiHome, CiCirclePlus, CiSearch } from "react-icons/ci"
import Post from "../../features/home/components/Post/Post"
import NoPosts from "../../features/home/components/NoPosts/NoPosts"
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture"

export default function Home() {
    return (
        <main className="absolute w-full h-full flex justify-center min-h-screen overflow-x-hidden bg-mainWhite font-montserrat">
            {/* Navigation section - desktop */}
            <section className="flex-auto grow-0 flex justify-end border-e-2 border-slate-200 sticky top-0">
                <nav className="block w-64 p-8">
                    <h1 className="text-4xl font-bold mb-10">Zy<span className="text-mainGreen">n</span>kle</h1>

                    <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
                        <CiHome className="my-auto"/>
                        <p className="my-auto ms-2">Home</p>
                    </Link>
                    <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
                        <CiCirclePlus className="my-auto"/>
                        <p className="my-auto ms-2">Create</p>
                    </Link>
                    <Link className="flex align-middle text-xl mb-4 p-2 cursor-pointer hover:text-mainGreen">
                        <CiSearch className="my-auto"/>
                        <p className="my-auto ms-2">Search</p>
                    </Link>
                </nav>
            </section>
            {/* Content section */}
            <section className="max-h-full min-h-full flex-auto grow border-e-2 border-slate-200 block overflow-x-hidden overflow-y-scroll no-scrollbar">
                <header className="flex justify-center py-10">
                    <button className="flex text-xl text-mainGreen py-2 px-10 border-mainGreen border-2 rounded-lg">
                        <CiCirclePlus className="my-auto"/>
                        <p className="my-auto ms-2">Create a new post</p>
                    </button>
                </header>
                <div className="block"> {/* Posts wrapper */}
                    <Post />
                    <NoPosts />
                </div>
            </section>
            <section className="flex-auto shrink grow-0 w-[25%] sticky top-0">
                <div className="flex p-6 mt-4">
                    <ProfilePicture className="w-12 h-12"/>
                    <div className="block ms-2">
                        <Link className="my-auto text-sm font-bold">marionikolov17</Link>
                        <p className="my-auto text-sm opacity-60">Mario Nikolov</p>
                    </div>
                </div>
                <h3 className="ms-6 font-bold text-lg">Top Creators</h3>
            </section>
        </main>
    )
}