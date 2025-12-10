import { motion } from "framer-motion";

const team = [
  {
    name: "Sowvik Suvo",
    role: "Founder & MERN Stack Developer",
    img: "https://lh3.googleusercontent.com/a/ACg8ocLLcCoZdKQ7hYFlR7LNIecoo0aMUxo9xV13tyMSOvvUlP0YF4IX=s288-c-no",
  },
  {
    name: "Saykat Baul",
    role: "Head Chef & Food Specialist",
    img: "https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/489798622_2135697456843753_8496589038563511107_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qRpdlvfIzGUQ7kNvwGHNpDZ&_nc_oc=AdnfPilpTn1NW5GFQcOEvVe9JPdpISQfz9659uaZezqeLwbaQeXCzi2wQi168rc4ROQ&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=yI7LP_ZaPI3ysll7ODZtPw&oh=00_AfkWmtc56evdgGnpEV2LPUD8BKj8Fm8gkmVo3rvhbROWxw&oe=693E1F64",
  },
];

const Team = () => {
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-orange-700 mb-10">
        Meet Our Team
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {team.map((t, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center"
          >
            <img
              src={t.img}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-orange-500"
            />
            <h3 className="text-xl font-bold text-orange-700">{t.name}</h3>
            <p className="text-gray-600">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;
