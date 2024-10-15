import {
  PiRocketLaunch,
  PiPuzzlePiece,
  PiChartBar,
  PiUsers,
} from "react-icons/pi";

const Home = () => {
  const features = [
    {
      icon: <PiRocketLaunch size={32} />,
      title: "Custom Layouts",
      description: "Create and save your own custom layouts",
    },
    {
      icon: <PiPuzzlePiece size={32} />,
      title: "Drag & Drop",
      description: "Easily drag and drop components to build your diagrams",
    },
    {
      icon: <PiChartBar size={32} />,
      title: "Advanced Diagramming",
      description: "Create flowcharts, mind maps, and org charts with ease",
    },
    {
      icon: <PiUsers size={32} />,
      title: "Collaboration",
      description: "Work together in real-time with your team",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <header className="hero min-h-[70vh] bg-base-100 flex items-center justify-center">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-6xl font-bold mb-4">Sketch</h1>
            <p className="text-xl mb-8">Create stunning diagrams with ease</p>
            <button className="btn btn-primary btn-lg">Get Started</button>
          </div>
        </div>
      </header>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <div className="text-primary">{feature.icon}</div>
              </figure>
              <div className="card-body items-center text-center">
                <h3 className="card-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Start Creating Now</h2>
        <button className="btn btn-primary btn-lg">Try it for free</button>
      </section>
    </div>
  );
};

export default Home;
