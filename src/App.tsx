import React, { useState, useEffect } from 'react';

interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

interface ScenarioResponse {
  highOpenness?: string;
  lowOpenness?: string;
  highConscientiousness?: string;
  lowConscientiousness?: string;
  highExtraversion?: string;
  lowExtraversion?: string;
  highAgreeableness?: string;
  lowAgreeableness?: string;
  highNeuroticism?: string;
  lowNeuroticism?: string;
}

interface Scenario {
  prompt: string;
  responses: ScenarioResponse;
}

interface RoleTemplate {
  id: string;
  name: string;
  emoji: string;
  description: string;
  traits: PersonalityTraits;
}

const roleTemplates: RoleTemplate[] = [
  {
    id: "custom",
    name: "Custom Template",
    emoji: "✨",
    description: "Start from scratch and create your own personality profile",
    traits: {
      openness: 50,
      conscientiousness: 50,
      extraversion: 50,
      agreeableness: 50,
      neuroticism: 50
    }
  },
  {
    id: "data-entry",
    name: "Data Entry Clerk",
    emoji: "💻",
    description: "Focused on accuracy and consistency in data processing",
    traits: {
      openness: 20,
      conscientiousness: 90,
      extraversion: 20,
      agreeableness: 50,
      neuroticism: 20
    }
  },
  {
    id: "bookkeeping",
    name: "Bookkeeping & Payroll Clerk",
    emoji: "🧾",
    description: "Precise and reliable financial record keeping",
    traits: {
      openness: 20,
      conscientiousness: 95,
      extraversion: 20,
      agreeableness: 70,
      neuroticism: 20
    }
  },
  {
    id: "telemarketer",
    name: "Telemarketer & Call Center Rep",
    emoji: "📞",
    description: "Outgoing and persuasive communication skills",
    traits: {
      openness: 50,
      conscientiousness: 50,
      extraversion: 90,
      agreeableness: 80,
      neuroticism: 20
    }
  },
  {
    id: "content-writer",
    name: "Content Generator",
    emoji: "✍️",
    description: "Creative writing with structured guidelines",
    traits: {
      openness: 70,
      conscientiousness: 80,
      extraversion: 40,
      agreeableness: 50,
      neuroticism: 50
    }
  },
  {
    id: "graphic-artist",
    name: "Graphic Production Artist",
    emoji: "🎨",
    description: "Balancing creativity with technical precision",
    traits: {
      openness: 50,
      conscientiousness: 80,
      extraversion: 40,
      agreeableness: 70,
      neuroticism: 50
    }
  },
  {
    id: "driver",
    name: "Transportation & Delivery Driver",
    emoji: "🚛",
    description: "Reliable and efficient delivery service",
    traits: {
      openness: 40,
      conscientiousness: 80,
      extraversion: 20,
      agreeableness: 50,
      neuroticism: 20
    }
  },
  {
    id: "paralegal",
    name: "Paralegal & Legal Assistant",
    emoji: "🗂",
    description: "Detail-oriented legal support",
    traits: {
      openness: 50,
      conscientiousness: 95,
      extraversion: 40,
      agreeableness: 50,
      neuroticism: 50
    }
  },
  {
    id: "bank-teller",
    name: "Bank Teller & Clerk",
    emoji: "🏦",
    description: "Customer service in financial transactions",
    traits: {
      openness: 40,
      conscientiousness: 80,
      extraversion: 80,
      agreeableness: 90,
      neuroticism: 40
    }
  },
  {
    id: "video-editor",
    name: "Video Editor",
    emoji: "🎥",
    description: "Technical and creative video production",
    traits: {
      openness: 70,
      conscientiousness: 80,
      extraversion: 20,
      agreeableness: 50,
      neuroticism: 50
    }
  },
  {
    id: "lab-tech",
    name: "Lab Technician",
    emoji: "🧪",
    description: "Precise scientific testing and analysis",
    traits: {
      openness: 40,
      conscientiousness: 95,
      extraversion: 20,
      agreeableness: 70,
      neuroticism: 20
    }
  }
];

const initialTraits: PersonalityTraits = {
  openness: 50,
  conscientiousness: 50,
  extraversion: 50,
  agreeableness: 50,
  neuroticism: 50,
};

const traitDescriptions = {
  openness: {
    low: "Traditional, conventional, prefers routine",
    high: "Creative, curious, open to new experiences"
  },
  conscientiousness: {
    low: "Spontaneous, flexible, less organized",
    high: "Organized, responsible, detail-oriented"
  },
  extraversion: {
    low: "Reserved, quiet, prefers solitude",
    high: "Outgoing, energetic, social"
  },
  agreeableness: {
    low: "Competitive, skeptical, less cooperative",
    high: "Compassionate, cooperative, trusting"
  },
  neuroticism: {
    low: "Calm, stable, emotionally secure",
    high: "Sensitive, anxious, emotionally reactive"
  }
};

const exampleScenarios: Scenario[] = [
  {
    prompt: "What do you think about trying a new restaurant?",
    responses: {
      highOpenness: "I'd love to try that new fusion restaurant! I'm always excited to explore new cuisines and experiences.",
      lowOpenness: "I prefer sticking to familiar restaurants where I know what to expect.",
      highExtraversion: "That sounds amazing! Let's invite some friends and make it a social event!",
      lowExtraversion: "I'd prefer a quiet dinner, maybe just the two of us.",
      highAgreeableness: "Whatever you'd like! I'm happy to try whatever makes you comfortable.",
      lowAgreeableness: "I have some specific preferences. Let me check the menu first.",
      highNeuroticism: "I'm a bit worried about the food quality and service. Should we check the reviews first?",
      lowNeuroticism: "Sounds good! I'm sure it'll be fine either way."
    }
  },
  {
    prompt: "How would you handle a tight deadline?",
    responses: {
      highConscientiousness: "I'll create a detailed schedule and break this down into manageable tasks.",
      lowConscientiousness: "We'll figure it out as we go. No need to stress about planning everything.",
      highNeuroticism: "This is really stressful! I hope we can manage everything in time.",
      lowNeuroticism: "No problem, we'll handle it step by step.",
      highAgreeableness: "Let's work together and support each other through this.",
      lowAgreeableness: "I'll focus on my part, you handle yours."
    }
  }
];

function App() {
  const [traits, setTraits] = useState<PersonalityTraits>(initialTraits);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [previewResponse, setPreviewResponse] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleTraitChange = (trait: keyof PersonalityTraits, value: number) => {
    setTraits((prev: PersonalityTraits) => ({
      ...prev,
      [trait]: value
    }));
    setSelectedTemplate(null);
  };

  const applyTemplate = (template: RoleTemplate) => {
    setTraits(template.traits);
    setSelectedTemplate(template.id);
  };

  const generatePreviewResponse = () => {
    const scenario = exampleScenarios[currentScenario];
    const responses: string[] = [];

    if (traits.openness > 70 && scenario.responses.highOpenness) {
      responses.push(scenario.responses.highOpenness);
    } else if (traits.openness < 30 && scenario.responses.lowOpenness) {
      responses.push(scenario.responses.lowOpenness);
    }

    if (traits.conscientiousness > 70 && scenario.responses.highConscientiousness) {
      responses.push(scenario.responses.highConscientiousness);
    } else if (traits.conscientiousness < 30 && scenario.responses.lowConscientiousness) {
      responses.push(scenario.responses.lowConscientiousness);
    }

    if (traits.extraversion > 70 && scenario.responses.highExtraversion) {
      responses.push(scenario.responses.highExtraversion);
    } else if (traits.extraversion < 30 && scenario.responses.lowExtraversion) {
      responses.push(scenario.responses.lowExtraversion);
    }

    if (traits.agreeableness > 70 && scenario.responses.highAgreeableness) {
      responses.push(scenario.responses.highAgreeableness);
    } else if (traits.agreeableness < 30 && scenario.responses.lowAgreeableness) {
      responses.push(scenario.responses.lowAgreeableness);
    }

    if (traits.neuroticism > 70 && scenario.responses.highNeuroticism) {
      responses.push(scenario.responses.highNeuroticism);
    } else if (traits.neuroticism < 30 && scenario.responses.lowNeuroticism) {
      responses.push(scenario.responses.lowNeuroticism);
    }

    if (responses.length === 0) {
      const moderateResponses = [
        "I think we should consider all options carefully.",
        "Let's take a balanced approach to this.",
        "I'm open to discussion and finding a middle ground."
      ];
      responses.push(moderateResponses[Math.floor(Math.random() * moderateResponses.length)]);
    }

    setPreviewResponse(responses.join(" "));
  };

  useEffect(() => {
    generatePreviewResponse();
  }, [traits, currentScenario]);

  const nextScenario = () => {
    setCurrentScenario((prev: number) => (prev + 1) % exampleScenarios.length);
  };

  const generatePromptCode = () => {
    const traitDescriptions = Object.entries(traits)
      .map(([trait, value]) => {
        const level = value > 70 ? "high" : value < 30 ? "low" : "moderate";
        return `${trait}: ${level} (${value}%)`;
      })
      .join("\n");

    return `// AI Personality Configuration
const personalityTraits = {
${Object.entries(traits)
  .map(([trait, value]) => `  ${trait}: ${value}`)
  .join(",\n")}
};

// Example prompt with personality context
const prompt = \`You are an AI assistant with the following personality traits:
${traitDescriptions}

Please respond to the user's query while maintaining these personality characteristics.\`;

// Usage with OpenAI API
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "system", content: prompt },
    { role: "user", content: "What do you think about trying a new restaurant?" }
  ]
});`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatePromptCode());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-400">
          AI Personality Traits
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {roleTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template)}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedTemplate === template.id
                  ? 'bg-purple-600 border-2 border-purple-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">{template.emoji}</span>
                <h3 className="text-lg font-semibold text-purple-400">{template.name}</h3>
              </div>
              <p className="text-sm text-gray-300">{template.description}</p>
            </button>
          ))}
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {Object.entries(traits).map(([trait, value]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-lg font-medium text-gray-200 capitalize">
                    {trait}
                  </label>
                  <span className="text-sm text-gray-400">
                    {value}%
                  </span>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleTraitChange(trait as keyof PersonalityTraits, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{traitDescriptions[trait as keyof typeof traitDescriptions].low}</span>
                  <span>{traitDescriptions[trait as keyof typeof traitDescriptions].high}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Current Personality Profile</h2>
            <div className="space-y-2">
              {Object.entries(traits).map(([trait, value]) => (
                <div key={trait} className="flex items-center">
                  <div className="w-32 text-sm text-gray-300 capitalize">{trait}</div>
                  <div className="flex-1 h-2 bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-300 text-right">{value}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">AI Response Preview</h2>
            <div className="mb-4">
              <p className="text-gray-300 font-medium">Scenario:</p>
              <p className="text-gray-200">{exampleScenarios[currentScenario].prompt}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-300 font-medium">AI Response:</p>
              <p className="text-gray-200 italic">{previewResponse}</p>
            </div>
            <button
              onClick={nextScenario}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Try Another Scenario
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-purple-400">Prompt Code</h2>
              <div className="space-x-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors"
                >
                  {showCode ? "Hide Code" : "Show Code"}
                </button>
                {showCode && (
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                  >
                    {copySuccess ? "Copied!" : "Copy Code"}
                  </button>
                )}
              </div>
            </div>
            {showCode && (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{generatePromptCode()}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 