import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";

function Home(){
    return (
        <div className="bg-zinc-900 text-white px-10 py-8">
            <Hero />
            <LatestCollection />
        </div>
    )
}

export default Home;