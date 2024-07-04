import { CiHome } from "react-icons/ci"

export default function Home() {
    return (
        <main className="absolute w-full flex justify-center min-h-screen overflow-x-hidden bg-mainWhite font-montserrat">
            {/* Navigation section - desktop */}
            <section className="w-32 flex-auto flex justify-end" id="app-navigation-container">
                <nav className="block w-64 p-5">
                    <h1 className="text-4xl font-bold mb-10">Zy<span className="text-mainGreen">n</span>kle</h1>

                    <a className="flex align-middle text-xl mb-4 p-2 cursor-pointer">
                        <CiHome className="my-auto"/>
                        <p className="my-auto ms-2">Home</p>
                    </a>
                    <a className="flex align-middle text-xl p-2 cursor-pointer">
                        <CiHome className="my-auto"/>
                        <p className="my-auto ms-2">Home</p>
                    </a>
                </nav>
            </section>
            {/* Content section */}
            <section className="w-64 flex-auto"></section>
            {/* Search section */}
            <section className="w-32 flex-auto"></section>
        </main>
    )
}