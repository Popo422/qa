import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface RubricItem {
  id: string
  name: string
  passScore: number
  selected: boolean
}

export default function SelectRubricTab() {
  const [rubrics, setRubrics] = useState<RubricItem[]>([
    { id: '1', name: 'Insurance : Claims Appeal', passScore: 75, selected: true },
    { id: '2', name: 'Insurance : Check Status', passScore: 75, selected: false },
    { id: '3', name: 'Insurance : Request Documentation/Forms', passScore: 75, selected: true },
    { id: '4', name: 'Insurance : Update Existing Claim', passScore: 75, selected: false },
    { id: '5', name: 'Insurance : Make a Payment', passScore: 75, selected: true },
    { id: '6', name: 'Insurance : Billing Inquiry', passScore: 75, selected: false },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRubricId, setSelectedRubricId] = useState<string>('')
  const [newPassScore, setNewPassScore] = useState('')

  const handleRubricSelect = (rubricId: string) => {
    setRubrics(prev => prev.map(rubric => 
      rubric.id === rubricId 
        ? { ...rubric, selected: !rubric.selected }
        : rubric
    ))
  }

  const handleChangePassScore = (rubricId: string) => {
    const rubric = rubrics.find(r => r.id === rubricId)
    if (rubric) {
      setSelectedRubricId(rubricId)
      setNewPassScore(rubric.passScore.toString())
      setIsModalOpen(true)
    }
  }

  const handleConfirmPassScore = () => {
    const score = parseInt(newPassScore)
    if (isNaN(score) || score < 0 || score > 100) {
      toast.error('Please enter a valid score between 0 and 100')
      return
    }
    
    setRubrics(prev => prev.map(rubric => 
      rubric.id === selectedRubricId 
        ? { ...rubric, passScore: score }
        : rubric
    ))
    setIsModalOpen(false)
    toast.success('Pass score updated successfully')
  }

  const handleSave = () => {
    toast.success('Rubric settings saved successfully')
  }

  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-600 mb-2">Select a scoring rubric to apply to your uploaded calls.</p>
      </div>

      {/* Rubrics Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rubric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rubrics.map((rubric) => (
                <tr key={rubric.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Checkbox
                      checked={rubric.selected}
                      onCheckedChange={() => handleRubricSelect(rubric.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {rubric.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {rubric.passScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600 border-red-500"
                      onClick={() => handleChangePassScore(rubric.id)}
                    >
                      Change Pass Score
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <Button onClick={handleSave} className="bg-red-500 hover:bg-red-600">
          Save
        </Button>
      </div>

      {/* Change Pass Score Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Pass Score</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter the New Pass Score
              </label>
              <Input
                type="number"
                placeholder="Enter Pass Score"
                value={newPassScore}
                onChange={(e) => setNewPassScore(e.target.value)}
                min="0"
                max="100"
              />
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-800 text-white hover:bg-gray-900"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPassScore}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}