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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [rubricData, setRubricData] = useState<RubricData[]>([])

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'select' | 'upload')
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="select">Select Rubric</TabsTrigger>
            <TabsTrigger value="upload">Upload Rubric</TabsTrigger>
          </TabsList>
          
          <TabsContent value="select" className="mt-6">
            <SelectRubricTab />
          </TabsContent>
          
          <TabsContent value="upload" className="mt-6">
            <UploadRubricTab 
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              rubricData={rubricData}
              setRubricData={setRubricData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}