import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SelectRubricTab from './components/SelectRubricTab'
import UploadRubricTab from './components/UploadRubricTab'
import PreviewRubricTab from './components/PreviewRubricTab'

export interface RubricData {
  idNo: string
  qaCategory: string
  criteria: string
  explanation: string
  sampleScript: string
  score: string
}

export default function RubricsPage() {
  const [activeTab, setActiveTab] = useState<'select' | 'upload'>('select')
  const [showPreview, setShowPreview] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [rubricData, setRubricData] = useState<RubricData[]>([])

  const handleTabChange = (value: string) => {
    if (showPreview && value === 'upload') {
      // If we're in preview and switching to upload tab, just hide preview
      setShowPreview(false)
      return
    }
    setActiveTab(value as 'select' | 'upload')
    if (value === 'select') {
      setShowPreview(false)
    }
  }

  const handleShowPreview = (data: RubricData[]) => {
    setRubricData(data)
    setShowPreview(true)
  }

  const handleBackToUpload = () => {
    setShowPreview(false)
  }

  if (showPreview) {
    return (
      <PreviewRubricTab 
        onBack={() => setActiveTab('select')} 
        onBackToUpload={handleBackToUpload}
        rubricData={rubricData}
        onUpdateRubricData={setRubricData}
      />
    )
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
        
        <Tabs value={showPreview ? 'upload' : activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="select">Select Rubric</TabsTrigger>
            <TabsTrigger value="upload">Upload Rubric</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="mt-6">
            <SelectRubricTab />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-6">
            <UploadRubricTab 
              onShowPreview={handleShowPreview}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}