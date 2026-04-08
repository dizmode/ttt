export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">🎨 T-Shirts That Talk</h1>
            <nav className="nav" aria-label="Main navigation">
              <a href="/" className="nav-link active">Home</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/gallery" className="nav-link">Gallery</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="hero min-h-[420px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content relative z-10 text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold drop-shadow-lg">
            Welcome to T-Shirts That Talk
          </h2>
          <p className="text-white text-lg md:text-xl mt-4 drop-shadow-md">
            Home of Tie Dyes & Lucky Gear!
          </p>
          <p className="hero-sub text-white mt-2 drop-shadow-md">
            Everywhere You Walk, Your T-Shirt Will Let You Talk!
          </p>
        </div>
      </section>

      {/* Daily Deals Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">🔥 Daily Deals</h2>
          <p className="text-center text-gray-400 mb-10">Something on sale every single day — come check it out!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="deal-card">
              <div className="deal-day">Monday</div>
              <div className="deal-name">Hoodie Monday</div>
              <div className="deal-offer">20% off all Hoodies</div>
            </div>
            <div className="deal-card highlight">
              <div className="deal-day">Tuesday</div>
              <div className="deal-name">Tie Dye Tuesdays</div>
              <div className="deal-offer">20% off Tie Dye Tees & Tanks</div>
            </div>
            <div className="deal-card">
              <div className="deal-day">Wednesday</div>
              <div className="deal-name">HumpDay Wednesdays</div>
              <div className="deal-offer">20% off X-Rated gear</div>
            </div>
            <div className="deal-card">
              <div className="deal-day">Thursday</div>
              <div className="deal-name">Thirsty Thursdays</div>
              <div className="deal-offer">20% off Beer gear</div>
            </div>
            <div className="deal-card highlight">
              <div className="deal-day">Friday</div>
              <div className="deal-name">3 For Fridays</div>
              <div className="deal-offer">Buy 3, Get One Free!</div>
            </div>
            <div className="deal-card">
              <div className="deal-day">Saturday</div>
              <div className="deal-name">Smokin&apos; Saturdays</div>
              <div className="deal-offer">20% off 420-Related items</div>
            </div>
            <div className="deal-card">
              <div className="deal-day">Sunday</div>
              <div className="deal-name">Sunday Brunch</div>
              <div className="deal-offer">15% off — Opening til 2pm</div>
            </div>
            <div className="deal-card deal-lucky">
              <div className="deal-day">Every Day</div>
              <div className="deal-name">🍀 Lucky Gear</div>
              <div className="deal-offer">Always in stock!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-3">⭐ Google Reviews</h2>
          <p className="text-center text-gray-600 mb-8">See what customers are saying about T-Shirts That Talk.</p>

          <div className="bg-gray-100 rounded-xl p-4 md:p-6 shadow">
            <iframe
              title="Google Reviews - T-Shirts That Talk"
              src="https://www.google.com/maps?q=T-Shirts+That+Talk,+3125+Van+Horne+Rd,+Qualicum+Beach,+BC&z=15&output=embed"
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <a href="https://www.google.com/search?q=T-Shirts+That+Talk+Qualicum+Beach+reviews" target="_blank" rel="noopener" className="inline-block bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 transition">Read Reviews on Google</a>
              <a href="https://www.google.com/search?q=T-Shirts+That+Talk+Qualicum+Beach+write+a+review" target="_blank" rel="noopener" className="inline-block bg-white border border-black text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">Leave a Review</a>
            </div>

            <div id="random-reviews" className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-20">
        <h2 className="text-4xl font-bold mb-8 text-center">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <div className="mb-6">
              <p className="font-semibold">📍 Location</p>
              <p className="text-gray-600">#2 - 3125 Van Horne Rd.<br />Qualicum Beach, BC V9K 2R3<br /><em>(Hilliers area)</em></p>
            </div>
            <div className="mb-6">
              <p className="font-semibold">📞 Phone</p>
              <p className="text-gray-600"><a href="tel:2509518869" className="text-blue-600 hover:underline">(250) 951-8869</a></p>
            </div>
            <div className="mb-6">
              <p className="font-semibold">✉️ Email</p>
              <p className="text-gray-600"><a href="mailto:tshirtsthattalk@gmail.com" className="text-blue-600 hover:underline">tshirtsthattalk@gmail.com</a></p>
            </div>
            <div className="mb-6">
              <p className="font-semibold">👤 Owner</p>
              <p className="text-gray-600">Jambo</p>
            </div>
            <div className="mb-6">
              <p className="font-semibold">💬 Follow Us</p>
              <p className="text-gray-600">
                <a href="https://facebook.com/tshirtsthattalkbc" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Facebook</a> · 
                <a href="https://instagram.com/tshirts_that_talk" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Instagram</a>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Send us a Message</h3>
            <form id="contactForm" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                <input type="text" id="name" name="name" required autoComplete="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                <input type="email" id="email" name="email" required autoComplete="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                <textarea id="message" name="message" rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black" placeholder="Tell us about your design..."></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About T-Shirts That Talk</h4>
              <p>Quality t-shirts and custom print designs for everyone.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#shipping">Shipping Info</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 T-Shirts That Talk — #2 - 3125 Van Horne Rd., Qualicum Beach, BC · Owner: Jambo&nbsp;· <a href="tel:2509518869" style={{ color: '#999' }}>(250) 951-8869</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

