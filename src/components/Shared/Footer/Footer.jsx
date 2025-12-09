import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/images/logo2.png";

const Footer = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        type: "spring",
        stiffness: 50,
      },
    }),
  };

  const socialIcons = [
    { icon: <FaFacebookF />, link: "#", color: "hover:text-blue-600" },
    { icon: <FaInstagram />, link: "#", color: "hover:text-pink-500" },
    { icon: <FaTwitter />, link: "#", color: "hover:text-blue-400" },
    { icon: <FaLinkedinIn />, link: "#", color: "hover:text-blue-700" },
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 text-gray-800 mt-12 rounded-t-3xl shadow-lg"
    >
      <motion.div
        className="absolute w-60 h-60 bg-orange-300/20 rounded-full top-[-50px] left-[-50px] blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-pink-200/30 rounded-full bottom-[-30px] right-[-30px] blur-2xl"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 relative z-10">
        <motion.div variants={fadeUp} custom={1}>
          <img src={logo} alt="LocalChefBazaar Logo" className="w-32 mb-4" />
          <p className="text-gray-700 text-sm md:text-base">
            Fresh, homemade meals delivered right to your doorstep by local
            chefs.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} custom={2}>
          <h3 className="text-xl font-bold mb-4 text-orange-600">Contact Us</h3>
          <p className="text-gray-700 text-sm">
            123 Chicken St, Barisal, Bangladesh
          </p>
          <p className="text-gray-700 text-sm">Phone: +880-1768225209</p>
          <p className="text-gray-700 text-sm">
            Email: order@chickendelivery.com
          </p>
        </motion.div>

        <motion.div variants={fadeUp} custom={3}>
          <h3 className="text-xl font-bold mb-4 text-orange-600">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            {socialIcons.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className={`text-orange-500 p-3 bg-white/30 rounded-full shadow-md hover:scale-110 transition-transform duration-300 ${item.color}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={4}>
          <h3 className="text-xl font-bold mb-4 text-orange-600">
            Working Hours
          </h3>
          <p className="text-gray-700 text-sm">Mon-Fri: 10:00 AM - 10:00 PM</p>
          <p className="text-gray-700 text-sm">Sat-Sun: 10:00 AM - 11:00 PM</p>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        custom={5}
        className="bg-gradient-to-r from-orange-600 via-pink-500 to-red-500 text-white text-center py-4 mt-8 text-sm tracking-wide font-medium shadow-inner"
      >
        &copy; {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
