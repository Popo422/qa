export default function AIDashboardPage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">AI Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor AI performance and model analytics</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Models</h3>
            <div className="mt-4 text-2xl font-bold text-blue-600">12</div>
            <p className="text-sm text-gray-600 mt-1">Running models</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Calls</h3>
            <div className="mt-4 text-2xl font-bold text-green-600">1.2M</div>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <div className="mt-4 text-2xl font-bold text-orange-600">127ms</div>
            <p className="text-sm text-gray-600 mt-1">Average</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Rate</h3>
            <div className="mt-4 text-2xl font-bold text-green-600">99.7%</div>
            <p className="text-sm text-gray-600 mt-1">Last 24 hours</p>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Model Performance</h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center text-gray-500">
                Performance Chart Placeholder
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Model GPT-4 deployed successfully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Training completed for Audio-Model-v2</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">High traffic detected on Evaluation API</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}