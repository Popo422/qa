export default function AudioEvaluationPage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audio Evaluation</h1>
          <p className="text-gray-600 mt-2">Evaluate and analyze audio recordings with AI-powered tools</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Evaluations</h3>
            <p className="text-gray-600">View and manage recent audio evaluations</p>
            <div className="mt-4 text-2xl font-bold text-blue-600">24</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Queue</h3>
            <p className="text-gray-600">Audio files currently being processed</p>
            <div className="mt-4 text-2xl font-bold text-orange-600">7</div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accuracy Score</h3>
            <p className="text-gray-600">Average evaluation accuracy</p>
            <div className="mt-4 text-2xl font-bold text-green-600">94.2%</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Audio Upload</h2>
          </div>
          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600">Drag and drop audio files here or click to browse</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Choose Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}