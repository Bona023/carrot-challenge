export default function Home() {
    return (
        <div className="w-[400px] h-[800px] bg-gradient-to-b from-bg-top to-bg-bottom mx-auto mt-20 rounded-2xl flex flex-col">
            <div className="w-full py-10 text-center mt-20 mb-12">
                <h1 className="text-4xl font-bold">Welcome!</h1>
            </div>
            <div>
                <form
                    action=""
                    className="w-full px-8 grid grid-cols-1 gap-6"
                >
                    <input
                        type="text"
                        name="email"
                        className="input-style"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="username"
                        className="input-style"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        name="password"
                        className="input-style"
                        placeholder="Password"
                    />
                    <button className="bg-[#687EFF] text-white text-xl py-2 rounded-lg cursor-pointer hover:bg-[#577BC1] hover:text-gray-300 font-bold">Log In</button>
                </form>
            </div>
        </div>
    );
}
