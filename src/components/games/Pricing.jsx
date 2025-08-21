const plans = [
  {
    name: "Starter",
    price: 49,
    highlight: false,
    features: [
      "Up to 50 candidates/month",
      "Basic AI resume screening",
      "Interview scheduling",
      "Team collaboration tools",
      "Interview scheduling",
    ],
  },
  {
    name: "Pro",
    price: 99,
    highlight: true,
    features: [
      "Up to 200 candidates/month",
      "AI screening + assessments",
      "Video interview analysis",
      "Team collaboration tools",
      "Full analytics suite",
      "API integration",
    ],
  },
  {
    name: "Enterprise",
    price: 149,
    highlight: false,
    features: [
      "Unlimited candidates",
      "Custom AI models",
      "Dedicated success manager",
      "Full analytics suite",
      "API integration",
    ],
  },
];

const Pricing = () => {
  return (
    <div className="px-2 py-6 lg:py-12 md:p-12 w-full mx-auto">
      <div className="flex flex-col gap-4 justify-center items-center text-center">
        <div className="bg-sky-100 px-3 py-1 rounded-full text-xs font-semibold text-sky-600">
          Pricing
        </div>
        <h1
          className="text-2xl lg:text-4xl font-black text-center lg:leading-tight text-gray-900 drop-shadow-lg max-w-sm mb-4"
          style={{
            textShadow:
              "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.8)",
          }}
        >
          Flexible Pricing Plans for Every Teams
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center text-start">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-8">
            {plans.map((plan) => (
              <div
                class={`flex flex-col justify-between rounded-3xl p-6 shadow-xs border-1 border-gray-200
          ${
            plan.highlight
              ? "md:scale-110 bg-sky-500 text-white shadow-lg"
              : "bg-gray-50 text-gray-800"
          }
          h-full
        `}
              >
                <div>
                  <span
                    class={`text-xs font-semibold uppercase mb-2 inline-block ${
                      plan.highlight
                        ? "bg-white text-sky-500 px-3 py-1 rounded-full"
                        : "text-sky-500"
                    }`}
                  >
                    {plan.name}
                  </span>

                  <h2 class="text-4xl font-bold">
                    ${plan.price}
                    <span
                      class={`text-base font-medium ${
                        plan.highlight ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      /month
                    </span>
                  </h2>

                  <ul
                    class={`mt-6 space-y-3 text-sm ${
                      plan.highlight ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <button
                  class={`mt-6 text-sm font-semibold rounded-full py-2 w-fit px-4 ${
                    plan.highlight
                      ? "bg-white text-sky-500 hover:bg-gray-100"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
