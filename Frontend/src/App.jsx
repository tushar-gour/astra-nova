// Import necessary dependencies and icons
import React, { useState } from "react";
import {
  MessageSquare,
  Github,
  Youtube,
  Database,
  Brain,
  Code,
  Linkedin,
  Twitter,
  Image,
} from "lucide-react";
import Logo from "/assets/post_up_nobg.png";

const App = () => {
  // State management for form handling and API interactions
  const [inputValue, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "https://social-analyics-app-team-dryrun.koyeb.app/api/v1/analytics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputValue }),
        }
      );
      const data = await res.json();
      console.log(data);
      setResponse(data.message);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to fetch analysis.");
    }
    setLoading(false);
  };

  // Technology stack data with icons and descriptions
  const techStack = [
    {
      icon: <Brain className="w-8 h-8" />,
      name: "Langflow",
      description: "AI-powered workflow automation",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "AstraDB",
      description: "Scalable cloud database solution",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: <Code className="w-8 h-8" />,
      name: "LangChain",
      description: "Language model integration framework",
      color: "from-emerald-500 to-teal-600",
    },
  ];

  // Team member data with enhanced profiles and social links
  const teamMembers = [
    {
      name: "Shriram Tiwari",
      bio: "Specializing in Full stack Development and Data Analytics ",
      image: "assets/raam2.png",
      color: "from-violet-500 to-purple-600",
      links: {
        github: "https://github.com/shriramt124",
        linkedin: "https://www.linkedin.com/in/shriramt124/",
      },
    },
    {
      name: "Tushar Gour",

      bio: "Expertise in Android Development and Backend Development",
      image: "assets/tushar.png",
      color: "from-rose-500 to-pink-600",
      links: {
        github: "https://github.com/tushar-gour",
        linkedin: "https://www.linkedin.com/in/tushar-gour-a87366270/",
      },
    },
    {
      name: "Madhav Gupta",

      bio: "Expertise in Python Development and Data Science",
      image: "assets/madhav.png",
      color: "from-amber-500 to-orange-600",
      links: {
        github: "https://github.com/mikejohnson",
        linkedin: "https://linkedin.com/in/mikejohnson",
      },
    },
    {
      name: "Tanishq Baghel",
      bio: "Web Development",
      image: "assets/tanishq.png",
      color: "from-teal-500 to-cyan-600",
      links: {
        github:
          "https://social-analytics-kmyy03lyj-lightning-hudsons-projects.vercel.app",
        linkedin: "https://www.linkedin.com/in/tanishq-baghel-073072345/",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-300"></div>
      </div>

      <div className="relative">
        {/* Header Section */}
        <header className="border-b border-white/10 backdrop-blur-xl bg-slate-900/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/5 rounded-lg">
                  <img src={Logo} alt="PostUp" width={35} height={35} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  POST UP
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/tushar-gour/social-analytics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>
                    <a href="https://github.com/tushar-gour/social-analytics">
                      GitHub
                    </a>
                  </span>
                </a>
                <a
                  href="https://www.youtube.com/watch?v=FX_7xDHD3K4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 transition-opacity"
                >
                  <Youtube className="w-5 h-5" />
                  <span>Watch Demo</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12 space-y-24">
          {/* Content Analysis Section */}
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                Analyze Your
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Social Media Content
                </span>
              </h2>
              <p className="text-slate-400 text-lg">
                Leverage AI to optimize your social media strategy and boost
                engagement
              </p>
              <div className="p-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <form
                  onSubmit={handleSubmit}
                  className="bg-slate-900 rounded-xl p-6"
                >
                  <textarea
                    value={inputValue}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Eg: which type of post is most engaging and which age group is most involved in it and what time of day users are most active in it on which device type"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                    rows="6"
                  ></textarea>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                        Analyzing...
                      </span>
                    ) : (
                      "Analyze"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {response && (
                <div className="p-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                  <div className="bg-slate-900 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-pink-400" />
                      Analysis Results
                    </h3>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-slate-300">{response}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Technology Stack Section */}
          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Powered by Advanced Tech
              </h2>
              <p className="text-slate-400">
                Built with cutting-edge technologies for optimal performance
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {techStack.map((tech, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity blur-xl`}
                  />
                  <div className="relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all backdrop-blur-sm">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tech.color} mb-4`}
                    >
                      {tech.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                    <p className="text-slate-400">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Enhanced Team Section */}
          <section className="py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Passionate experts committed to revolutionizing social media
                content creation.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                  <div className="relative bg-slate-800 p-6 rounded-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mb-4 ring-2 ring-purple-500/50"
                    />
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-pink-400 mb-3">{member.role}</p>
                    <p className="text-slate-400 mb-4">{member.bio}</p>
                    <div className="flex gap-4">
                      {Object.entries(member.links).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-pink-400 transition-colors"
                        >
                          {platform === "github" && (
                            <Github className="w-5 h-5" />
                          )}
                          {platform === "linkedin" && (
                            <Linkedin className="w-5 h-5" />
                          )}
                          {platform === "twitter" && (
                            <Twitter className="w-5 h-5" />
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Demo Section */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl font-bold">See It In Action</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Watch our demo to see how Post up can transform your social media
              strategy
            </p>
            <a
              href="https://youtube.com/your-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 transition-opacity text-lg font-semibold"
            >
              <Youtube className="w-6 h-6" />
              Watch Demo Video
            </a>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-24">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-center text-slate-400">
              © {new Date().getFullYear()} Post up. Built with passion by our
              amazing team.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
