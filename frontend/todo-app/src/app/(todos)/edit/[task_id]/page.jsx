"use client"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import MobileTemplateWhite from '@/components/MobileTemplateWhite'
import TopBarEdit from '@/components/TopBarEdit'
import InputText from '@/components/InputText'
import UpdateButton from '@/components/UpdateButton'
import CancelButton from '@/components/CancelButton'

export default function EditTaskPage() {
  const router = useRouter()
  const { task_id } = useParams()
  const [formData, setFormData] = useState({
    title_text: '',
    detail_text: ''
  })

  useEffect(() => {
    if (!task_id) return
    
    axios.get(`http://localhost:8000/tasks/${task_id}`)
      .then(({ data }) => setFormData({
        title_text: data.title_text || '',
        detail_text: data.detail_text || ''
      }))
  }, [task_id])

  const handleUpdate = async () => {
    await axios.put(`http://localhost:8000/tasks/${task_id}`, formData)
    router.push('/')
  }

  return (
    <div>
      <TopBarEdit />
      <MobileTemplateWhite>
        <form onSubmit={e => { e.preventDefault(); handleUpdate() }}>
          <InputText
            titleValue={formData.title_text}
            detailValue={formData.detail_text}
            onTitleChange={value => setFormData({...formData, title_text: value})}
            onDetailChange={value => setFormData({...formData, detail_text: value})}
          />
          
          <div className="flex flex-row gap-4 mt-15">
            <UpdateButton onClick={handleUpdate} />
            <CancelButton onClick={() => router.push('/')} />
          </div>
        </form>
      </MobileTemplateWhite>
    </div>
  )
}