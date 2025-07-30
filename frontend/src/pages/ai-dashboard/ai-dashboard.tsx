import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Widget from '@/components/Widget';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from '@tanstack/react-table';

type TableData = {
  date: string;
  agentName: string;
  manager: string;
  callOpening: number;
  communication: number;
  productService: number;
  compliance: number;
  softSkills: number;
  issueResolution: number;
  closing: number;
  aiScore: string;
  qaStatus: string;
  remarks: string;
  scoreColor: string;
};

const columnHelper = createColumnHelper<TableData>();

export default function AIDashboardPage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'evaluation'>('dashboard');
  const [activeTab, setActiveTab] = useState('Claims Appeal');
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null);
  const [filters, setFilters] = useState({
    date: '',
    agentName: 'All Agents',
    qaManager: '',
    qaStatus: '',
    remark: '',
    qaScore: ''
  });

  const handleViewScore = useCallback((rowData: TableData) => {
    const evaluationData = {
      agentName: rowData.agentName,
      date: '02/15/2025',
      callDate: rowData.date,
      callDuration: '3m 55s',
      callOutcome: 'Select a Call Outcome',
      metrics: [
        { metric: 'Call Opening', maxScore: 5, aiScore: 5, weight: '15%', wtScore: '15%' },
        { metric: 'Communication', maxScore: 5, aiScore: 4, weight: '10%', wtScore: '8%' },
        { metric: 'Product/Service Knowledge', maxScore: 5, aiScore: 3, weight: '20%', wtScore: '12%' },
        { metric: 'Compliance & Process', maxScore: 5, aiScore: 5, weight: '25%', wtScore: '25%' },
        { metric: 'Soft Skills', maxScore: 5, aiScore: 3, weight: '10%', wtScore: '6%' },
        { metric: 'Issue Resolution', maxScore: 5, aiScore: 4, weight: '10%', wtScore: '8%' },
        { metric: 'Call Closing', maxScore: 5, aiScore: 5, weight: '10%', wtScore: '10%' },
      ],
      totalScore: '84%'
    };
    setSelectedEvaluation(evaluationData);
    setCurrentView('evaluation');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setCurrentView('dashboard');
    setSelectedEvaluation(null);
  }, []);

  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const tabs = useMemo(() => ['Claims Appeal', 'Refund Request', 'Billing Inquiry', 'Policy Change', 'Form Request'], []);
  
  const tableData = useMemo(() => [
    {
      date: '7/18/2025',
      agentName: 'John Brooks',
      manager: 'Mini John',
      callOpening: 21,
      communication: 18,
      productService: 14,
      compliance: 11,
      softSkills: 8,
      issueResolution: 8,
      closing: 8,
      aiScore: '68%',
      qaStatus: 'Fail',
      remarks: 'Needs Review',
      scoreColor: 'bg-red-500'
    },
    {
      date: '7/18/2025',
      agentName: 'John Brooks',
      manager: 'Mini John',
      callOpening: 20,
      communication: 17,
      productService: 23,
      compliance: 13,
      softSkills: 23,
      issueResolution: 8,
      closing: 8,
      aiScore: '67%',
      qaStatus: 'Fail',
      remarks: 'Compliance Error',
      scoreColor: 'bg-red-500'
    },
    {
      date: '7/18/2025',
      agentName: 'Xavier John',
      manager: 'Mini John',
      callOpening: 21,
      communication: 18,
      productService: 14,
      compliance: 11,
      softSkills: 8,
      issueResolution: 8,
      closing: 8,
      aiScore: '75%',
      qaStatus: 'Pass',
      remarks: 'No Review Needed',
      scoreColor: 'bg-yellow-500'
    },
    {
      date: '7/18/2025',
      agentName: 'Xavier John',
      manager: 'Mini John',
      callOpening: 20,
      communication: 17,
      productService: 23,
      compliance: 13,
      softSkills: 23,
      issueResolution: 8,
      closing: 8,
      aiScore: '78%',
      qaStatus: 'Pass',
      remarks: 'No Review Needed',
      scoreColor: 'bg-yellow-500'
    },
    {
      date: '7/18/2025',
      agentName: 'Dion Castillo',
      manager: 'Mini John',
      callOpening: 21,
      communication: 18,
      productService: 14,
      compliance: 11,
      softSkills: 8,
      issueResolution: 8,
      closing: 8,
      aiScore: '80%',
      qaStatus: 'Pass',
      remarks: 'No Review Needed',
      scoreColor: 'bg-green-400'
    },
    {
      date: '7/18/2025',
      agentName: 'Dion Castillo',
      manager: 'Mini John',
      callOpening: 20,
      communication: 17,
      productService: 23,
      compliance: 13,
      softSkills: 23,
      issueResolution: 8,
      closing: 8,
      aiScore: '95%',
      qaStatus: 'Pass',
      remarks: 'No Review Needed',
      scoreColor: 'bg-green-500'
    }
  ], []);

  const columns = useMemo<ColumnDef<TableData>[]>(
    () => [
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('agentName', {
        header: 'Agent Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('manager', {
        header: 'Manager',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('callOpening', {
        header: 'Call Opening',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('communication', {
        header: 'Communication',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('productService', {
        header: 'Product/Service Knowledge',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('compliance', {
        header: 'Compliance & Process',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('softSkills', {
        header: 'Soft Skills',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('issueResolution', {
        header: 'Issue Resolution',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('closing', {
        header: 'Closing',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('aiScore', {
        header: 'AI Score',
        cell: (info) => (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${info.row.original.scoreColor}`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('qaStatus', {
        header: 'QA Status',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('remarks', {
        header: 'Remarks',
        cell: (info) => info.getValue(),
      }),
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: ({ row }) => (
          <button 
            onClick={() => handleViewScore(row.original)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium"
          >
            View Score
          </button>
        ),
      }),
    ],
    [handleViewScore]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const insights = useMemo(() => [
    {
      title: "Automated Suggestions",
      items: [
        "Agent Missed Final Confirmation",
        "Agent Lack Empathy"
      ]
    },
    {
      title: "Tags", 
      items: [
        "Soft Skills",
        "Product Service Knowledge"
      ]
    },
    {
      title: "Compliance Detection",
      items: [
        "Compliant"
      ]
    },
    {
      title: "Sentiments",
      items: [
        "Positive"
      ]
    },
    {
      title: "Dead Air",
      items: [
        "5 Silence(s) Without Hold Notice",
        "Product Service Knowledge"
      ]
    },
    {
      title: "Hold Time",
      items: [
        "I Hold for 45 Seconds, customer informed"
      ]
    },
    {
      title: "Repetition Detected",
      items: [
        "Agent Re-explained the same step twice"
      ]
    }
  ], []);

  // Evaluation Results Screen
  if (currentView === 'evaluation' && selectedEvaluation) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Evaluation Results</h1>
        </div>

        {/* Agent Info & Call Details Widget */}
        <Widget>
          <div className="space-y-8">
            {/* Agent Info - Top Row Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                <div className="text-center">
                  <span className="text-gray-600 block mb-1">Agent Name:</span>
                  <span className="font-semibold text-gray-900">{selectedEvaluation.agentName}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 block mb-1">Date:</span>
                  <span className="font-semibold text-gray-900">{selectedEvaluation.date}</span>
                </div>
              </div>
            </div>

            {/* Call Details - Bottom Row Centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                <div className="text-center">
                  <span className="text-gray-600 block mb-1">Call Date:</span>
                  <span className="font-semibold text-gray-900">{selectedEvaluation.callDate}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 block mb-1">Call Duration:</span>
                  <span className="font-semibold text-gray-900">{selectedEvaluation.callDuration}</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-600 block mb-2">Call Outcome:</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm mx-auto">
                    <option>Select a Call Outcome</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Widget>

        {/* Evaluation Metrics Widget */}
        <Widget title="Evaluation Metrics">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-medium">KPI Metric</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Max Score</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">AI Score Given</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Weight</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">WT Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedEvaluation.metrics.map((metric: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{metric.metric}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{metric.maxScore}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`font-medium ${
                        metric.aiScore >= 5 ? 'text-green-600' : 
                        metric.aiScore >= 4 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {metric.aiScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-center">{metric.weight}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <span className={`font-medium ${
                        parseFloat(metric.wtScore) >= 20 ? 'text-green-600' : 
                        parseFloat(metric.wtScore) >= 10 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {metric.wtScore}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-4 py-3 text-sm text-gray-900" colSpan={4}>Total Score</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <span className="font-bold text-green-600 text-lg">{selectedEvaluation.totalScore}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Widget>

        {/* Insights Widget */}
        <Widget title="Insights">
          <div className="grid grid-cols-2 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white rounded-lg border p-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{insight.title}</h4>
                <ul className="space-y-2 list-disc list-inside">
                  {insight.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Widget>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Edit Score
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Schedule Coaching
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Original Transcript
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Evidence Based Transcript
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            Submit Evaluation
          </button>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBackToDashboard}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 rounded-md text-sm font-medium"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Screen (default view)
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Evaluated Calls</h1>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
          Switch to Manager Dashboard
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-pink-50 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
            <div className="text-sm text-gray-600">Total Calls Handled</div>
          </CardContent>
        </Card>
        <Card className="bg-pink-50 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
            <div className="text-sm text-gray-600">Total Calls Audited</div>
          </CardContent>
        </Card>
        <Card className="bg-pink-50 border-pink-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">79%</div>
            <div className="text-sm text-gray-600">Quality Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          >
            <option>Select a Date</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.agentName}
            onChange={(e) => setFilters({...filters, agentName: e.target.value})}
          >
            <option>All Agents</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">QA Manager :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.qaManager}
            onChange={(e) => setFilters({...filters, qaManager: e.target.value})}
          >
            <option>Select an QA Manager</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">QA Status :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.qaStatus}
            onChange={(e) => setFilters({...filters, qaStatus: e.target.value})}
          >
            <option>Select a Status</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Remark :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.remark}
            onChange={(e) => setFilters({...filters, remark: e.target.value})}
          >
            <option>Select a Remark</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">QA Score :</label>
          <select 
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={filters.qaScore}
            onChange={(e) => setFilters({...filters, qaScore: e.target.value})}
          >
            <option>Select Score</option>
          </select>
        </div>
      </div>

      {/* AI Scores Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 text-center">AI Scores</h2>
        
        {/* Tabs */}
        <div className="flex justify-center space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Data Table using TanStack React Table */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}