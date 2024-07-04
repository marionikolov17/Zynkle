import { Link } from "react-router-dom"
import { CiHome, CiCirclePlus, CiSearch } from "react-icons/ci"

export default function Home() {
    return (
        <main className="absolute w-full flex justify-center min-h-screen overflow-x-hidden bg-mainWhite font-montserrat">
            {/* Navigation section - desktop */}
            <section className="w-32 flex-auto flex justify-end border-e-2 border-slate-200" id="app-navigation-container">
                <nav className="block w-64 p-5">
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
            <section className="w-64 max-h-full flex-auto border-e-2 border-slate-200 block overflow-x-hidden overflow-y-scroll no-scrollbar">

            </section>
            {/* Search section */}
            <section className="w-32 flex-auto"></section>
        </main>
    )
}