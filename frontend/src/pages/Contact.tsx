import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
                {/* Heading */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Contact Us</h1>
                    <div className="w-16 h-1 bg-gray-400 rounded-full mx-auto mt-2"></div>
                </div>

                {/* Contact Form */}
                <form className="bg-white shadow-md rounded-xl p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="example@email.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            <option>Order Issue</option>
                            <option>Refund Request</option>
                            <option>Product Inquiry</option>
                            <option>Technical Support</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            rows={4}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            placeholder="Enter your message"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-800 text-white font-medium py-3 rounded-lg hover:bg-gray-900 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
