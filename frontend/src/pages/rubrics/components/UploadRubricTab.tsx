import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, FileText, FileSpreadsheet, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import * as XLSX from 'xlsx'
import { RubricData } from '../rubrics'

interface UploadRubricTabProps {
  uploadedFiles: File[]
  setUploadedFiles: (files: File[]) => void
  rubricData: RubricData[]
  setRubricData: (data: RubricData[]) => void
}

export default function UploadRubricTab({ uploadedFiles, setUploadedFiles, rubricData, setRubricData }: UploadRubricTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    processFiles(files)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    const files = Array.from(event.dataTransfer.files)
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv')
    )
    
    if (validFiles.length !== files.length) {
      toast.error('Please upload only Excel (.xlsx, .xls) or CSV files')
    }
    
    setUploadedFiles([...uploadedFiles, ...validFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one file')
      return
    }
    
    // Mock data for the preview
    const mockRubricData = [
      { idNo: '1', qaCategory: 'Communication', criteria: 'Clear speech', explanation: 'Agent speaks clearly', sampleScript: 'Hello, how can I help?', score: '85' },
      { idNo: '2', qaCategory: 'Empathy', criteria: 'Shows understanding', explanation: 'Agent demonstrates empathy', sampleScript: 'I understand your concern', score: '90' },
      { idNo: '3', qaCategory: 'Problem Solving', criteria: 'Resolves issues', explanation: 'Agent provides solutions', sampleScript: 'Let me help you with that', score: '88' },
      { idNo: '4', qaCategory: 'Professionalism', criteria: 'Professional tone', explanation: 'Maintains professional demeanor', sampleScript: 'Thank you for calling', score: '87' },
      { idNo: '5', qaCategory: 'Knowledge', criteria: 'Product knowledge', explanation: 'Demonstrates expertise', sampleScript: 'Based on our policy', score: '92' },
    ]
    
    setRubricData(mockRubricData)
    setShowPreview(true)
  }

  const downloadSampleRubric = () => {
    // Create sample data
    const sampleData = [
      {
        'ID No.': '1',
        'QA Category': 'Communication',
        'Criteria': 'Clear speech',
        'Explanation': 'Agent speaks clearly and is easy to understand',
        'Sample Script': 'Hello, how can I help you today?',
        'Score': '85'
      },
      {
        'ID No.': '2',
        'QA Category': 'Empathy',
        'Criteria': 'Shows understanding',
        'Explanation': 'Agent demonstrates empathy and understanding',
        'Sample Script': 'I understand your concern and I\'m here to help',
        'Score': '90'
      },
      {
        'ID No.': '3',
        'QA Category': 'Problem Solving',
        'Criteria': 'Resolves issues',
        'Explanation': 'Agent provides effective solutions to customer problems',
        'Sample Script': 'Let me help you resolve this issue right away',
        'Score': '88'
      },
      {
        'ID No.': '4',
        'QA Category': 'Professionalism',
        'Criteria': 'Professional tone',
        'Explanation': 'Agent maintains professional demeanor throughout the call',
        'Sample Script': 'Thank you for calling, I appreciate your patience',
        'Score': '87'
      },
      {
        'ID No.': '5',
        'QA Category': 'Knowledge',
        'Criteria': 'Product knowledge',
        'Explanation': 'Agent demonstrates comprehensive knowledge of products/services',
        'Sample Script': 'Based on our current policy, I can offer you these options',
        'Score': '92'
      }
    ]

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(sampleData)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sample Rubric')

    // Download file
    XLSX.writeFile(wb, 'Sample_Rubric.xlsx')
    toast.success('Sample rubric downloaded successfully')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleCellChange = (index: number, field: keyof RubricData, value: string) => {
    const updatedData = [...rubricData]
    updatedData[index] = { ...updatedData[index], [field]: value }
    setRubricData(updatedData)
  }

  const handleSave = () => {
    toast.success('Rubric saved successfully!')
    setShowPreview(false)
  }

  const handleBackToUpload = () => {
    setShowPreview(false)
  }

  // If showing preview, render the preview screen
  if (showPreview) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Preview Rubric</h2>
            <p className="text-sm text-gray-500 mt-1">Rubric.xlsx</p>
          </div>
          <Button
            variant="outline"
            onClick={handleBackToUpload}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Upload
          </Button>
        </div>

        {/* Editable Table */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-r">ID No.</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-r">QA Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-r">Criteria</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-r">Explanation</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-r">Sample Script</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Score</th>
                </tr>
              </thead>
              <tbody>
                {rubricData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 border-r">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                    <td className="px-4 py-3 border-r">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                    <td className="px-4 py-3 border-r">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                    <td className="px-4 py-3 border-r">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                    <td className="px-4 py-3 border-r">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-500">Table Cell</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSave}
            className="bg-red-500 hover:bg-red-600 px-8"
          >
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Rubric</h2>
      </div>

      {/* File Upload Area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <FileSpreadsheet className="h-8 w-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drag and Drop Your Files</h3>
            <p className="text-sm text-gray-500 mb-4">.xlsx, .xls, .csv formats. Up to 50MB</p>
            <Button onClick={handleFileSelect} variant="outline">
              Select File
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700 italic">
          Make sure your file follows the correct format so it can be read by the app. Download the sample file below for reference
        </p>
        <Button 
          variant="link" 
          onClick={downloadSampleRubric}
          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
        >
          Download Sample Rubric
        </Button>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files:</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • 85% • 37 sec left • Uploading
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-start">
        <Button 
          onClick={handleNext}
          disabled={uploadedFiles.length === 0}
          className="bg-red-500 hover:bg-red-600"
        >
          Next
        </Button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}