import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { RubricData } from '../rubrics'

interface PreviewRubricTabProps {
  onBack: () => void
  onBackToUpload: () => void
  rubricData: RubricData[]
  onUpdateRubricData: (data: RubricData[]) => void
}

export default function PreviewRubricTab({ onBack, onBackToUpload, rubricData, onUpdateRubricData }: PreviewRubricTabProps) {
  const handleCellChange = (index: number, field: keyof RubricData, value: string) => {
    const updatedData = [...rubricData]
    updatedData[index] = { ...updatedData[index], [field]: value }
    onUpdateRubricData(updatedData)
  }

  const handleSave = () => {
    toast.success('Rubric saved successfully!')
    onBack()
  }

  const handleTabChange = (value: string) => {
    if (value === 'select') {
      onBack()
    }
  }

  return (
    <div className="animate-in fade-in-0 duration-500">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Rubrics</h1>
            <p className="text-gray-600 mt-2">Select a scoring rubric to apply to your uploaded calls.</p>
          </div>
        </div>
        
        <Tabs value="upload" onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="select">Select Rubric</TabsTrigger>
            <TabsTrigger value="upload">Upload Rubric</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="mt-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Preview Rubric</h2>
                  <p className="text-sm text-gray-500 mt-1">Rubric.xlsx</p>
                </div>
                <Button
                  variant="outline"
                  onClick={onBackToUpload}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}