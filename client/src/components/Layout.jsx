const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="bg-white shadow-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-3 transition-transform duration-300">
                                <img src="/logo.svg" alt="BookGarnus Logo" className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">BookGarnus</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Active
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <p className="text-center text-gray-600 text-sm">
                        © 2026 BookGarnus. Built with MERN Stack
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;