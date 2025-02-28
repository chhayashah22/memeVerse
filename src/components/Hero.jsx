import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
    return (
        <div className="min-h-[75vh] flex flex-col lg:flex-row gap-12 lg:gap-6 items-center">
            {/* Left Content */}
            <motion.div 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start items-center gap-6"
            >
                <motion.p 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-2xl sm:text-4xl lg:text-6xl text-center lg:text-left font-semibold text-yellow-100"
                >
                    Dive into Endless Laughter
                </motion.p>
                
                <motion.p 
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-base sm:text-xl text-center lg:text-left text-zinc-300"
                >
                    Scroll through the funniest memes and share the joy—because laughter never goes out of style!
                </motion.p>
                
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <Link 
                        to="/explore-meme" 
                        className="text-yellow-100 text-sm sm:text-xl font-semibold border border-yellow-100 px-10 py-3 rounded-full hover:bg-zinc-800"
                    >
                        Explore Memes
                    </Link>
                </motion.div>
            </motion.div>

            {/* Right Image with Floating Animation */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{ duration: 2,  repeatType: "reverse" }}
                className="w-full lg:w-1/2 flex items-center justify-center mt-[-30px] "
            >
                <img src="./cat-removebg-preview.png" alt="Meme" className="max-w-full h-auto lg:h-[100%]" />
            </motion.div>
        </div>
    );
}

export default Hero;
