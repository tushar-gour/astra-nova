import React, { useState } from "react";
import { BarChart2, Zap, TrendingUp, Users, MessageSquare, Share2 } from 'lucide-react';

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://your-backend-api.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      setResponse(data.analysis);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to fetch analysis.");
    }
    setLoading(false);
  };

  // Feature cards data
  const features = [
    {
      icon: <BarChart2 className="w-8 h-8 text-blue-400" />,
      title: "Engagement Analysis",
      description: "Get detailed insights about your post's engagement metrics and performance patterns."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Real-time Processing",
      description: "Instant analysis of your social media content using advanced AI algorithms."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Trend Detection",
      description: "Identify trending patterns and optimal posting times for maximum reach."
    }
  ];

  // Metrics cards data
  const metrics = [
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Audience Insights",
      value: "Demographics & Behavior"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
      title: "Engagement Rate",
      value: "Performance Metrics"
    },
    {
      icon: <Share2 className="w-6 h-6 text-green-400" />,
      title: "Share Analysis",
      value: "Viral Potential"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-extrabold">
            <span className="text-blue-400">Social</span>
            <span className="text-purple-400">Post</span>
            <span className="text-white">Analyzer</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Analyze Your Social Media Posts
            </h2>
            <p className="text-gray-400 text-xl">
              Get AI-powered insights to optimize your social media strategy
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
                <div className="flex items-center gap-4">
                  {metric.icon}
                  <div>
                    <h3 className="text-white font-semibold">{metric.title}</h3>
                    <p className="text-gray-400">{metric.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Form */}
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 mb-12">
            <label className="block text-white text-lg font-semibold mb-4">
              Enter your post content:
            </label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type something like 'How to boost your LinkedIn engagement?'"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="5"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </span>
              ) : (
                "Analyze Post"
              )}
            </button>
          </form>

          {/* Analysis Result */}
          {response && (
            <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 mb-12">
              <h3 className="text-xl font-semibold text-white mb-4">Analysis Result:</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-gray-300">
                {response}
              </div>
            </div>
          )}

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SocialPostAnalyzer. Built with ❤️ by Your Name.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;