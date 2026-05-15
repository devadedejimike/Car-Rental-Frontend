import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div className="space-y-6">

            <h1 className="text-5xl font-bold leading-tight">
              Rent Your Dream Car
              <span className="block text-gray-500">
                Fast & Easy
              </span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              Explore premium and affordable cars
              for business, vacations, and daily use.
              Book cars easily anytime.
            </p>

            <div className="flex gap-4">

              <Link
                to="/cars"
                className="bg-black text-white px-6 py-3 rounded-lg"
              >
                Browse Cars
              </Link>

              <Link
                to="/auth"
                className="border border-black px-6 py-3 rounded-lg"
              >
                Get Started
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
              alt="Luxury Car"
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              Why Choose Us
            </h2>

            <p className="text-gray-500 mt-3">
              Simple, reliable and affordable
              car rental service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">
                Affordable Prices
              </h3>

              <p className="text-gray-600">
                Rent quality cars at competitive
                daily rates.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">
                Easy Booking
              </h3>

              <p className="text-gray-600">
                Book your preferred car in just
                a few clicks.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">
                Trusted Service
              </h3>

              <p className="text-gray-600">
                Reliable vehicles and secure
                booking process.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Ready To Start Driving?
          </h2>

          <p className="text-gray-600 mt-4">
            Browse available cars and make your
            first booking today.
          </p>

          <Link
            to="/cars"
            className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-lg"
          >
            Explore Cars
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Home;