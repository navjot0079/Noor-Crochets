import { motion } from 'framer-motion';
import { FiHeart, FiTruck, FiStar, FiAward } from 'react-icons/fi';
import { GiYarn, GiSewingNeedle } from 'react-icons/gi';

const About = () => {
    const values = [
        {
            icon: FiHeart,
            title: 'Made with Love',
            description: 'Every stitch carries warmth, care, and a piece of our heart',
        },
        {
            icon: GiYarn,
            title: 'Premium Quality',
            description: 'Only the softest, highest-quality yarns for ultimate comfort',
        },
        {
            icon: GiSewingNeedle,
            title: 'Handcrafted',
            description: 'Each piece is unique - no two items are exactly alike',
        },
        {
            icon: FiAward,
            title: 'Sustainable',
            description: 'Slow fashion, mindful making, and thoughtful design',
        },
    ];

    return (
        <div className="min-h-screen bg-cream pt-24 pb-12">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="text-gold text-sm uppercase tracking-wider font-medium">
                        ✨ OUR STORY ✨
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-darkBrown mt-3 mb-6">
                        Born from a <span className="gradient-text">Passion</span> for Craft
                    </h1>
                    <p className="text-xl text-darkBrown/70 leading-relaxed">
                        Every piece was born from crochet meetups, cozy mornings, and a deep love for the
                        rhythm of hook and yarn. Every stitch carries warmth, intention, and a little piece of
                        our heart.
                    </p>
                </motion.div>
            </section>

            {/* Story Section */}
            <section className="bg-gradient-to-br from-beige to-blush/20 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex justify-center md:pl-8"
                        >
                            <img
                                src="/src/assets/images/penguin.jpg"
                                alt="Crafting"
                                className="rounded-3xl shadow-2xl max-w-sm w-full h-auto object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-serif font-bold text-darkBrown mb-4">
                                The Journey Began with a Single Stitch
                            </h2>
                            <div className="space-y-3 text-darkBrown/70 leading-relaxed">
                                <p>
                                    It all started in a small corner of my home, with a crochet hook, a ball of yarn,
                                    and endless curiosity. What began as a hobby quickly turned into a passion — and
                                    then a calling.
                                </p>
                                <p>
                                    I spent countless hours learning new stitches, experimenting with patterns, and
                                    pouring love into every piece. Friends and family started asking for custom
                                    creations, and I realized I wanted to share this craft with the world.
                                </p>
                                <p>
                                    <strong className="text-darkBrown">Noor Crochets</strong> was born from that
                                    desire — to create beautiful, handmade pieces that bring warmth, joy, and a touch
                                    of artisan luxury to everyday life.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold text-sm uppercase tracking-wider font-medium">
                            ✨ WHAT WE BELIEVE ✨
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3">
                            Our Values
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                                    <value.icon className="text-3xl text-gold" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-darkBrown mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-darkBrown/70">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-gradient-to-br from-blush/20 to-lavender/20 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-gold text-sm uppercase tracking-wider font-medium">
                            ✨ HOW WE WORK ✨
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-darkBrown mt-3">
                            From Yarn to Your Home
                        </h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {[
                                {
                                    step: '01',
                                    title: 'Design & Inspiration',
                                    description:
                                        'Each design is thoughtfully created, inspired by nature, comfort, and timeless style.',
                                },
                                {
                                    step: '02',
                                    title: 'Premium Materials',
                                    description:
                                        'We source the finest yarns - soft, durable, and perfect for everyday use.',
                                },
                                {
                                    step: '03',
                                    title: 'Handcrafted Process',
                                    description:
                                        'Every piece is made by hand, stitch by stitch, with patience and care.',
                                },
                                {
                                    step: '04',
                                    title: 'Quality Check',
                                    description:
                                        'Before shipping, each item is carefully inspected to ensure perfection.',
                                },
                                {
                                    step: '05',
                                    title: 'Beautiful Packaging',
                                    description:
                                        'Your order arrives beautifully wrapped, ready to gift or enjoy yourself.',
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex gap-6 items-start"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold text-white flex items-center justify-center text-xl font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-darkBrown mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-darkBrown/70 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="bg-gradient-to-br from-gold to-blush rounded-3xl p-12 text-center text-white"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Ready to Find Your Perfect Piece?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Explore our handcrafted collection or request a custom creation
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.a
                                href="/shop"
                                className="px-8 py-4 bg-white text-darkBrown rounded-full font-medium hover:bg-cream transition-colors btn-ripple"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Shop Collections
                            </motion.a>
                            <motion.a
                                href="/custom-order"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-darkBrown transition-colors btn-ripple"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Custom Order
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
