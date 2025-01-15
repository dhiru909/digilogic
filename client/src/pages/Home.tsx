import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Book, Users, Star, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative text-primary bg-gradient-to-r from-blue-500 to-blue-300">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Master Digital Logic with Our Advanced Microcontroller Kits
            </h1>
            <p className="text-xl mb-8">
              Start your journey into the world of digital electronics with our
              comprehensive learning solutions.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Explore Products <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-primary-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Cpu className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Hardware</h3>
              <p className="text-muted-foreground">
                High-quality microcontroller kits designed for learning and
                development.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Book className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Comprehensive Courses
              </h3>
              <p className="text-muted-foreground">
                Structured learning paths from basics to advanced concepts.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-muted-foreground">
                Join our community of learners and experts for guidance and
                collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Separator />
      <div className="py-24 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "This kit transformed my learning experience! Highly recommended for enthusiasts and professionals alike.",
                name: "Rishi",
              },
              {
                text: "A great tool to understand digital electronics—easy to use and extremely educational!",
                name: "Amit",
              },
              {
                text: "Exceptional quality and support. I was able to build projects confidently thanks to this kit.",
                name: "Jaswant",
              },
            ].map((quote, index) => (
              <div
                key={index}
                className="bg-background border rounded-lg shadow-md p-6 text-center"
              >
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                <p className="italic mb-4">"{quote.text}"</p>
                <h4 className="font-bold">{quote.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-24 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1].map((i) => (
              <div
                key={i}
                className="bg-background border rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={`https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800`}
                  alt={`Product ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Starter Kit {i}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Perfect for beginners to learn digital logic.
                  </p>
                  <Link
                    to={`/products/${i}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Why Choose Us Section */}
      <div className="py-24 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="space-y-8">
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Practical Learning</h3>
              <p className="text-muted-foreground">
                Our content is designed to bridge the gap between theory and
                application, ensuring that you can confidently apply your
                knowledge in real-world scenarios.
              </p>
            </div>
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Expert Guidance</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with real-world experience who
                are passionate about teaching and mentoring.
              </p>
            </div>
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Community-Driven</h3>
              <p className="text-muted-foreground">
                Collaborate and grow with a community of passionate learners,
                innovators, and problem-solvers.
              </p>
            </div>
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Customized Approach
              </h3>
              <p className="text-muted-foreground">
                Our training programs and workshops are designed to meet the
                unique needs of individuals, whether you're a beginner or an
                experienced professional.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* FAQs Section */}
      <div className="py-24 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                What is included in the Starter Kit?
              </h3>
              <p className="text-muted-foreground">
                The Starter Kit includes a microcontroller board, essential
                components, and a beginner-friendly guide to help you get
                started.
              </p>
            </div>
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Do I need prior experience to use these kits?
              </h3>
              <p className="text-muted-foreground">
                No, our kits and courses are designed for beginners as well as
                advanced learners.
              </p>
            </div>
            <div className="bg-background border rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Is there community support available?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can join our vibrant community of learners and experts
                for support and collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-gradient-to-r from-blue-500 to-blue-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Learning Journey?
          </h2>
          <p className="text-lg mb-8">
            Get started today and join thousands of learners mastering digital
            electronics.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-colors"
          >
            Sign Up Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
