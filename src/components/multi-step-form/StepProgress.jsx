export default function StepProgress({ currentStep, totalSteps }) {
  const percent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between text-xs mb-1 text-gray-500">
        {[...Array(totalSteps)].map((_, i) => (
          <span key={i} className={i === currentStep ? "font-bold text-blue-600" : ""}>
            Step {i + 1}
          </span>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
