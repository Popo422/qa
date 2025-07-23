export default function RubricsPage() {
  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rubrics</h1>
            <p className="text-gray-600 mt-2">Create and manage evaluation rubrics and scoring criteria</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create New Rubric
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Rubrics</h3>
            <div className="mt-4 text-2xl font-bold text-blue-600">28</div>
            <p className="text-sm text-gray-600 mt-1">Available templates</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Rubrics</h3>
            <div className="mt-4 text-2xl font-bold text-green-600">15</div>
            <p className="text-sm text-gray-600 mt-1">Currently in use</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Score</h3>
            <div className="mt-4 text-2xl font-bold text-purple-600">7.8/10</div>
            <p className="text-sm text-gray-600 mt-1">Overall evaluation</p>
          </div>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Featured Rubrics</h2>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Audio Quality Assessment</h3>
                      <p className="text-sm text-gray-600 mt-1">Evaluates clarity, volume, and background noise</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">Duplicate</button>
                    <button className="text-red-600 hover:text-red-900 text-sm">Archive</button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Communication Skills</h3>
                      <p className="text-sm text-gray-600 mt-1">Assesses tone, pace, and professional language</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">Duplicate</button>
                    <button className="text-red-600 hover:text-red-900 text-sm">Archive</button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Customer Service Excellence</h3>
                      <p className="text-sm text-gray-600 mt-1">Measures empathy, problem-solving, and satisfaction</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm">Duplicate</button>
                    <button className="text-red-600 hover:text-red-900 text-sm">Archive</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-4">
              <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Import Rubric</h3>
                <p className="text-sm text-gray-600 mt-1">Upload existing rubric templates</p>
              </button>
              
              <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Template Library</h3>
                <p className="text-sm text-gray-600 mt-1">Browse pre-built rubric templates</p>
              </button>
              
              <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Usage Analytics</h3>
                <p className="text-sm text-gray-600 mt-1">View rubric performance metrics</p>
              </button>
              
              <button className="w-full text-left p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600 mt-1">Download rubric data and results</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}