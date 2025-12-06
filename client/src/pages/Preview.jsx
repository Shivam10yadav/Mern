import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import { ArrowLeftIcon, Loader } from 'lucide-react'
import LoaderForm from '../components/LoaderForm'
import ResumePreview from '../components/ResumePreview'
import PageNotFound from '../components/PageNotFound'
const Preview = () => {
  const{resumeid}=useParams()
  const [islOading,setIsLoading]=useState(true)

  const[resumedata,setresumedata]=useState(null)

  const loadResume=async()=>{
try {
      const {data}=await api.get('/api/resumes/public/' + resumeid)
    setresumedata(data.resume)
  
} catch (error) {
  console.log(error.message)
}finally{
  setIsLoading(false)
}
  }

  useEffect(()=>{
    loadResume()
  },[])
  return resumedata ? (

    
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
           <ResumePreview data={resumedata} template={resumedata.template} accentColor={resumedata.accent_color} classes='py-4 bg-white'/>
           </div>
    </div>
  ):(
    <div>
      {islOading?<LoaderForm/> :(
      <PageNotFound/>
      )}
    </div>
  )

  
  
}

export default Preview