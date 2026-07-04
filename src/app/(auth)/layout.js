export default function AuthLayout ({children}) {
    return (
        <div className="flex min-h-screen w-full">
            <div className="bg-blue-600 text-white p-4 w-1/2">
                <h1>Welcome to our platform</h1>
            </div>
            <div className="w-1/2">
                {children}
            </div>
        </div>
    )
}