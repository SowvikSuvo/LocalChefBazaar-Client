import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Container from "../../components/Shared/Container";

const ContactPage = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <Container>
      <div className="bg-orange-50 rounded-2xl text-gray-800 overflow-hidden relative">
        <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto text-center px-6"
          >
            <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              We are always here to help you! Feel free to reach out anytime.
            </p>
          </motion.div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <motion.div
              animate={{ y: [0, -40, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="absolute w-20 h-20 bg-white/10 rounded-full top-10 left-12"
            />
            <motion.div
              animate={{ y: [0, -60, 0] }}
              transition={{ repeat: Infinity, duration: 7 }}
              className="absolute w-16 h-16 bg-white/10 rounded-full bottom-10 right-16 rounded-b-2xl"
            />
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 ">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl text-center rounded-b-2xl"
          >
            <Mail size={40} className="mx-auto text-orange-600 mb-3" />
            <h3 className="text-xl font-bold text-orange-700">Email Support</h3>
            <p className="text-gray-600 mt-2">For inquiries & feedback</p>
            <p className="font-semibold mt-2">localchef@bazaar.com</p>
            <p className="font-semibold">help@localchef.com</p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl text-center"
          >
            <Phone size={40} className="mx-auto text-orange-600 mb-3" />
            <h3 className="text-xl font-bold text-orange-700">Hotline</h3>
            <p className="text-gray-600 mt-2">Call us anytime</p>
            <p className="font-semibold mt-2">+880 1768225209</p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            className="p-6 bg-white/30 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl text-center "
          >
            <MapPin size={40} className="mx-auto text-orange-600 mb-3" />
            <h3 className="text-xl font-bold text-orange-700">Our Location</h3>
            <p className="text-gray-600 mt-2">Barishal Sadar, Bangladesh</p>
            <p className="font-semibold">LocalChefBazaar HQ</p>
          </motion.div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-orange-700 mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-6">
                We’d love to hear from you! Fill out this form and our support
                team will get back within 24 hours.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <a className="p-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200">
                  <Facebook size={22} />
                </a>
                <a className="p-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200">
                  <Instagram size={22} />
                </a>
                <a className="p-3 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200">
                  <Youtube size={22} />
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/30 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl space-y-4"
            >
              <div>
                <label className="font-semibold text-orange-700">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="font-semibold text-orange-700">
                  Your Email
                </label>
                <input
                  type="email"
                  className="w-full mt-1 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="font-semibold text-orange-700">Message</label>
                <textarea
                  rows="4"
                  className="w-full mt-1 p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl text-center font-bold text-orange-700 mb-6">
            Find Us on the Map
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6"
          >
            <iframe
              className="w-full h-96 rounded-2xl shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3688.872997292308!2d90.366!3d22.701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQyJzA0LjAiTiA5MMKwMjInMDcuNiJF!5e0!3m2!1sen!2sbd!4v1700000000000"
              loading="lazy"
            ></iframe>
          </motion.div>
        </section>

        <div className="">
          <a
            href="https://wa.me/8801768225209"
            target="_blank"
            className="fixed bottom-28 right-7 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="w-8 h-8 "
            />
          </a>

          <button
            onClick={() => setOpenChat(true)}
            className="fixed bottom-46 right-6 bg-orange-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50"
          >
            💬
          </button>
        </div>

        {openChat && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 right-6 w-80 bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/20 z-50"
          >
            <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-2xl flex justify-between items-center">
              <h3 className="text-lg font-semibold">Live Chat</h3>
              <button
                onClick={() => setOpenChat(false)}
                className="text-white font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4 h-56 overflow-y-auto text-sm">
              <p className="text-gray-700 mb-3">
                👋 Hi! How can we help you today?
              </p>

              <div className="bg-orange-100 text-gray-700 p-2 rounded-lg w-fit mb-2">
                I want to know about meal orders.
              </div>

              <div className="bg-gray-100 text-gray-700 p-2 rounded-lg w-fit ml-auto mb-2">
                Sure! Tell me what you need.
              </div>
            </div>

            <div className="p-3 border-t bg-white/40 backdrop-blur-xl flex gap-2">
              <input
                className="flex-1 p-2 rounded-lg border border-orange-200"
                placeholder="Type a message..."
              />
              <button className="bg-orange-500 text-white px-3 rounded-lg">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Container>
  );
};

export default ContactPage;
