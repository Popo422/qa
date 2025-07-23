export default function AgentStatisticsPage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Agent Statistics</h1>
          <p className="text-gray-600 mt-2">Track agent performance and productivity metrics</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Agents</h3>
            <div className="mt-4 text-2xl font-bold text-green-600">45</div>
            <p className="text-sm text-gray-600 mt-1">Currently online</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluations Today</h3>
            <div className="mt-4 text-2xl font-bold text-blue-600">312</div>
            <p className="text-sm text-gray-600 mt-1">Completed tasks</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Score</h3>
            <div className="mt-4 text-2xl font-bold text-purple-600">8.7/10</div>
            <p className="text-sm text-gray-600 mt-1">Quality rating</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <div className="mt-4 text-2xl font-bold text-orange-600">2.3min</div>
            <p className="text-sm text-gray-600 mt-1">Average</p>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Performance Trends</h2>
            </div>
            <div className="p-6">
              <div className="h-64 flex items-center justify-center text-gray-500">
                Performance Trend Chart Placeholder
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Top Performers</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Sarah Johnson</span>
                  <span className="text-sm text-green-600">9.2/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Mike Chen</span>
                  <span className="text-sm text-green-600">9.0/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Emily Davis</span>
                  <span className="text-sm text-green-600">8.9/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Alex Rodriguez</span>
                  <span className="text-sm text-green-600">8.8/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}