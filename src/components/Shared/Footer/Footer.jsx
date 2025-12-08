import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/images/logo2.png"; // Your logo path

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, type: "spring" },
    }),
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-orange-100 to-orange-200 text-gray-800 mt-10 rounded-t-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        {/* Logo & Branding */}
        <motion.div variants={fadeUp} custom={1}>
          <img src={logo} alt="Chicken Delivery Logo" className="w-32 mb-4" />
          <p className="text-gray-700">
            Fresh and tasty chicken delivered to your doorstep.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeUp} custom={2}>
          <h3 className="text-xl font-bold mb-4 text-orange-700">Contact Us</h3>
          <p>123 Chicken St, Barisal, Bangladesh</p>
          <p>Phone: +880-1768225209</p>
          <p>Email: order@chickendelivery.com</p>
        </motion.div>

        {/* Social Media */}
        <motion.div variants={fadeUp} custom={3}>
          <h3 className="text-xl font-bold mb-4 text-orange-700">Follow Us</h3>
          <div className="flex gap-4 text-orange-600 text-lg">
            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-pink-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </motion.div>

        {/* Working Hours */}
        <motion.div variants={fadeUp} custom={4}>
          <h3 className="text-xl font-bold mb-4 text-orange-700">
            Working Hours
          </h3>
          <p>Mon-Fri: 10:00 AM - 10:00 PM</p>
          <p>Sat-Sun: 10:00 AM - 11:00 PM</p>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={fadeUp}
        custom={5}
        className="bg-orange-700 text-white text-center py-4 mt-6 text-sm"
      >
        &copy; {new Date().getFullYear()} Chicken Delivery. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
