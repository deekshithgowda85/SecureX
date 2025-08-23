function Footer() {
    return (
        <footer className="w-full bg-black text-white border-t border-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div>
                    <span className="text-2xl font-bold tracking-widest mb-2 block">SecureX</span>
                    <p className="text-sm text-white/80 mb-4">
                        Protecting India's Digital Future.<br />
                        SecureX offers advanced cybersecurity for everyone.
                    </p>
                    <span className="text-xs text-white/40">© 2025 deekshithgowda85</span>
                </div>
                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-white/80">
                        <li><a href="/" className="hover:text-white underline">Home</a></li>
                        <li><a href="/products" className="hover:text-white underline">Products</a></li>
                        <li><a href="/about" className="hover:text-white underline">About</a></li>
                        <li><a href="/contact" className="hover:text-white underline">Contact</a></li>
                        <li><a href="/privacy" className="hover:text-white underline">Privacy Policy</a></li>
                    </ul>
                </div>
                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Contact</h4>
                    <ul className="space-y-2 text-white/80">
                        <li>Email: <a href="mailto:info@securex.com" className="hover:text-white underline">info@securex.com</a></li>
                        <li>Phone: <a href="tel:+911234567890" className="hover:text-white underline">+91 12345 67890</a></li>
                        <li>Address: Bengaluru, India</li>
                    </ul>
                </div>
                {/* Socials */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4 mt-2">
                        {/* Facebook */}
                        <a href="https://facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                            <svg width="24" height="24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com/_deekshith_gowda___" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                            <svg width="24" height="24" fill="none"><path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com/in/deekshithgowda85" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                            <svg width="24" height="24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        {/* Twitter */}
                        <a href="https://twitter.com/deekshithgowda0" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                            <svg width="24" height="24" fill="none"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                        {/* GitHub */}
                        <a href="https://github.com/deekshithgowda85" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
                            <svg width="24" height="24" fill="none"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 18c-4.51 2-5-2-7-2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-10 text-center text-xs text-white/40">
                Made with ❤️ by deekshithgowda85 | Powered by SecureX
            </div>
        </footer>
    );
}
export default Footer;