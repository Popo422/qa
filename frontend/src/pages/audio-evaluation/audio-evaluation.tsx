import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, ChevronDown, X, Volume2, ArrowLeft, FileText } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
}

interface MetricData {
  kpi: string;
  metric: string;
  maxScore: number;
  scoreGiven: number;
  weight: number;
  wtScore: number;
}

const mockMetrics: MetricData[] = [
  { kpi: "Communication", metric: "Clarity", maxScore: 10, scoreGiven: 8, weight: 0.3, wtScore: 2.4 },
  { kpi: "Communication", metric: "Tone", maxScore: 10, scoreGiven: 9, weight: 0.2, wtScore: 1.8 },
  { kpi: "Problem Solving", metric: "Resolution", maxScore: 10, scoreGiven: 7, weight: 0.25, wtScore: 1.75 },
  { kpi: "Compliance", metric: "Adherence", maxScore: 10, scoreGiven: 10, weight: 0.25, wtScore: 2.5 },
];

const columnHelper = createColumnHelper<MetricData>();

const columns = [
  columnHelper.accessor("kpi", {
    header: "KPI",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("metric", {
    header: "Metric",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("maxScore", {
    header: "Max Score",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("scoreGiven", {
    header: "Score Given",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("weight", {
    header: "Weight",
    cell: (info) => info.getValue().toFixed(2),
  }),
  columnHelper.accessor("wtScore", {
    header: "WT Score",
    cell: (info) => info.getValue().toFixed(2),
  }),
];

export default function AudioEvaluationPage() {
  const navigate = useNavigate();
  const [showCallEvaluation, setShowCallEvaluation] = useState<boolean>(false);
  const [selectedOutcome, setSelectedOutcome] = useState<string>("");
  const [analysisCount, setAnalysisCount] = useState<number>(1);
  const [analysisSets, setAnalysisSets] = useState<{[key: number]: {
    uploadedFiles: UploadedFile[];
    selectedRubric: string;
    selectedAgent: string;
    isAnalyzing: boolean;
    hasAnalyzed: boolean;
  }}>({
    0: {
      uploadedFiles: [],
      selectedRubric: "",
      selectedAgent: "",
      isAnalyzing: false,
      hasAnalyzed: false,
    }
  });

  const handleFileUpload = (files: FileList | null, setIndex: number) => {
    if (!files) return;
    
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const validFiles = Array.from(files).filter(file => file.size <= maxSize);
    
    if (validFiles.length !== files.length) {
      toast.warning("Some files were skipped because they exceed the 10MB size limit.");
    }
    
    const newFiles: UploadedFile[] = validFiles.slice(0, 5).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
    }));
    
    setAnalysisSets(prev => ({
      ...prev,
      [setIndex]: {
        ...prev[setIndex],
        uploadedFiles: [...prev[setIndex].uploadedFiles, ...newFiles].slice(0, 5)
      }
    }));
  };

  const removeFile = (id: string, setIndex: number) => {
    setAnalysisSets(prev => ({
      ...prev,
      [setIndex]: {
        ...prev[setIndex],
        uploadedFiles: prev[setIndex].uploadedFiles.filter(file => file.id !== id)
      }
    }));
  };

  const handleAnalyze = async (setIndex: number) => {
    setAnalysisSets(prev => ({
      ...prev,
      [setIndex]: {
        ...prev[setIndex],
        isAnalyzing: true,
        hasAnalyzed: false
      }
    }));
    
    // Mock API call
    setTimeout(() => {
      setAnalysisSets(prev => ({
        ...prev,
        [setIndex]: {
          ...prev[setIndex],
          isAnalyzing: false,
          hasAnalyzed: true
        }
      }));
      toast.success("Analysis completed successfully!");
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const table = useReactTable({
    data: mockMetrics,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalScore = mockMetrics.reduce((sum, metric) => sum + metric.wtScore, 0);

  const addAnalysis = () => {
    const newIndex = analysisCount;
    setAnalysisCount(prev => prev + 1);
    setAnalysisSets(prev => ({
      ...prev,
      [newIndex]: {
        uploadedFiles: [],
        selectedRubric: "",
        selectedAgent: "",
        isAnalyzing: false,
        hasAnalyzed: false,
      }
    }));
  };

  const removeAnalysisSet = (setIndex: number) => {
    if (analysisCount <= 1) return; // Don't allow removing the last set
    
    setAnalysisSets(prev => {
      const newSets = { ...prev };
      delete newSets[setIndex];
      return newSets;
    });
    setAnalysisCount(prev => prev - 1);
  };

  const renderAnalysisSet = (index: number) => {
    const setData = analysisSets[index];
    if (!setData) return null;

    return (
      <div key={index} className="space-y-6">
        {index > 0 && (
          <div className="pt-6 border-t">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Analysis Set {index + 1}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAnalysisSet(index)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Remove Set
              </Button>
            </div>
          </div>
        )}
        
        {/* File Upload Area */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById(`file-input-${index}`)?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                handleFileUpload(e.dataTransfer.files, index);
              }}
            >
              <Button 
                variant="outline" 
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Drag Audios or Click to Browse
                <Upload className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Attach up to 5 uploads. Each upload must be within 10MB
              </p>
              <input
                id={`file-input-${index}`}
                type="file"
                multiple
                accept="audio/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files, index)}
              />
            </div>
          </div>
        </div>

        {/* Widget Panel */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 space-y-6">
            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scoring Rubric
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between bg-white text-gray-700 border-gray-300"
                    >
                      {setData.selectedRubric || "Select A Scoring Rubric"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedRubric: "Basic Audio Quality" }
                    }))}>
                      Basic Audio Quality
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedRubric: "Advanced Speech Analysis" }
                    }))}>
                      Advanced Speech Analysis
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedRubric: "Music Evaluation" }
                    }))}>
                      Music Evaluation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedRubric: "Podcast Assessment" }
                    }))}>
                      Podcast Assessment
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between bg-white text-gray-700 border-gray-300"
                    >
                      {setData.selectedAgent || "Select an Agent"}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedAgent: "AudioBot Pro" }
                    }))}>
                      AudioBot Pro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedAgent: "Speech Analyzer AI" }
                    }))}>
                      Speech Analyzer AI
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedAgent: "Quality Inspector" }
                    }))}>
                      Quality Inspector
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setAnalysisSets(prev => ({
                      ...prev,
                      [index]: { ...prev[index], selectedAgent: "Content Evaluator" }
                    }))}>
                      Content Evaluator
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Analysis Box */}
            <div className="bg-gray-50 rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Box</h3>
              
              <div className="space-y-2 mb-4">
                {setData.uploadedFiles.length === 0 ? (
                  <p className="text-gray-500 text-sm">No files uploaded yet</p>
                ) : (
                  setData.uploadedFiles.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between bg-white p-3 rounded border"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <Volume2 className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      {setData.hasAnalyzed && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-green-600 text-white border-green-600 hover:bg-green-700"
                          onClick={() => setShowCallEvaluation(true)}
                        >
                          View Call Evaluation
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id, index)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <Button 
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={setData.uploadedFiles.length === 0 || !setData.selectedRubric || !setData.selectedAgent || setData.isAnalyzing}
                onClick={() => handleAnalyze(index)}
              >
                {setData.isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (showCallEvaluation) {
    return (
      <div className="animate-in fade-in-0 duration-500">
        <div className="space-y-6">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCallEvaluation(false)}
              className="text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Audio Evaluation
            </Button>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Call Evaluation AI Review</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 3 Widgets */}
            <div className="lg:col-span-1 space-y-6">
              {/* Agent Info Widget */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Agent Info</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date:</span>
                      <span className="text-sm font-medium text-gray-900">Dec 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Agent Name:</span>
                      <span className="text-sm font-medium text-gray-900">Sarah Johnson</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Outcome Widget */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Call Outcome</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Call Outcome
                      </label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-between bg-white text-gray-700 border-gray-300"
                          >
                            {selectedOutcome || "Select Outcome"}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          <DropdownMenuItem onClick={() => setSelectedOutcome("Resolved")}>
                            Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedOutcome("Escalated")}>
                            Escalated
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedOutcome("Follow-up Required")}>
                            Follow-up Required
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedOutcome("Incomplete")}>
                            Incomplete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Call Date:</span>
                        <p className="text-sm font-medium text-gray-900">Dec 15, 2024</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Duration:</span>
                        <p className="text-sm font-medium text-gray-900">4m 13s</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Original Transcript
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Evaluated Transcript
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Metrics Widget */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Evaluation Metrics</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id} className="border-b">
                            {headerGroup.headers.map((header) => (
                              <th
                                key={header.id}
                                className="text-left py-2 px-1 font-medium text-gray-700"
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
                      <tbody>
                        {table.getRowModel().rows.map((row) => (
                          <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                              <td key={cell.id} className="py-2 px-1">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">Total Score:</span>
                      <span className="text-sm font-bold text-green-600">{totalScore.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Insights */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Insights</h2>
                  
                  <div className="space-y-6">
                    {/* Automated Suggestions */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Automated Suggestions</h3>
                      <ul className="space-y-2 list-disc list-inside">
                        <li className="text-sm text-gray-700">Agent Missed Final Confirmation</li>
                        <li className="text-sm text-gray-700">Agent Lack Empathy</li>
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Soft Skills</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">Product Service Knowledge</span>
                      </div>
                    </div>

                    {/* Compliance Detection */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance Detection</h3>
                      <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-700 font-medium">Compliant</li>
                      </ul>
                    </div>

                    {/* Sentiments */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Sentiments</h3>
                      <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-700 font-medium">Positive</li>
                      </ul>
                    </div>

                    {/* Dead Air */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Dead Air</h3>
                      <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-700">2 Silences &gt; 7 Without Hold Notice</li>
                      </ul>
                    </div>

                    {/* Hold Time */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Hold Time</h3>
                      <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-700">1 Hold for 45 Seconds, customer informed</li>
                      </ul>
                    </div>

                    {/* Repetition Detected */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Repetition Detected</h3>
                      <ul className="list-disc list-inside">
                        <li className="text-sm text-gray-700">Agent Re-explained the same step twice</li>
                      </ul>
                    </div>

                    {/* Talk/Hold/ACW */}
                    <div className="bg-white rounded-lg border p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Talk / Hold / ACW</h3>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600 font-medium">Talk:</span>
                          <p className="text-gray-700">3 m 2 sec</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">Hold:</span>
                          <p className="text-gray-700">10 sec</p>
                        </div>
                        <div>
                          <span className="text-gray-600 font-medium">ACW:</span>
                          <p className="text-gray-700">1 m 1 sec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Evaluation and Schedule Coaching Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline"
              size="lg"
              className="bg-red-600 text-white border-red-600 hover:bg-red-700"
            >
              Submit Evaluation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-red-600 text-white border-red-600 hover:bg-red-700"
            >
              Schedule Coaching
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audio Evaluation</h1>
        </div>
        
        {/* Render Analysis Sets */}
        {Object.keys(analysisSets).map(key => renderAnalysisSet(parseInt(key)))}

        {/* Add Analysis Button */}
        <div className="flex justify-start">
          <Button 
            variant="destructive" 
            size="lg"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={addAnalysis}
          >
            Add Analysis
          </Button>
        </div>
      </div>
    </div>
  );
}