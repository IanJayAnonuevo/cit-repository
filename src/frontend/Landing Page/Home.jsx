import Hero from './Hero'
import Navbar from './Navbar'

export default function Home() {
	return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <Hero />
            {/* Footer */}
            <footer className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-900 text-white py-3 mt-auto">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm md:text-base">
                        IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
	)
}
