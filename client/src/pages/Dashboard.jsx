import { FilePenLine, FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, Upload, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api'
import pdfToText from 'react-pdftotext'

// import Title from '../components/Title'

const Dashboard = () => {
  const {user,token}=useSelector(state=>state.auth)
  const colors=["#9333ea","#d97706","#dc2626","#0284c7","#16a34a"]
  const [allresumes,setallresumes]=useState([])
  const [showcreateresume,setshowcreatereume]=useState(false)
  const [showuploadresume,setshowuploadresume
  ]=useState(false)
  const [title,settitle]=useState('')
  const [resume,setresume]=useState(null)
  const [editresumeid,seteditresumeid]=useState('')
  const [isLoading,setIsLoading]=useState(false)

  const navigate=useNavigate()

  const loadallresumes=async () => {
    try {
      const { data}=await api.get('/api/users/resumes',{headers:{authorization:
        `bearer ${token}`
      }})
      setallresumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    
  }
 const createresume = async (event) => {
  try {
    event.preventDefault()
    
    console.log('🚀 Creating resume...')
    console.log('Token:', token)
    console.log('Title:', title)
    
    const {data} = await api.post('/api/resumes/create', {title}, {
      headers: {
        authorization: `bearer ${token}`
      }
    })
    
    console.log('✅ Success:', data)
    console.log('Resume created with ID:', data.resume._id)
    
    // Update state
    setallresumes([...allresumes, data.resume])
    settitle('')
    setshowcreatereume(false)
    
    // Navigate
    const navigatePath = `/app/builder/${data.resume._id}`
    console.log('🧭 Navigating to:', navigatePath)
    navigate(navigatePath)
    
    console.log('✅ Navigation called')
    
  } catch (error) {
    console.error('❌ Full Error:', error)
    console.error('❌ Error Response:', error?.response)
    console.error('❌ Error Data:', error?.response?.data)
    toast.error(error?.response?.data?.message || error.message)
  }
}

  const uploadresume = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      console.log('Starting PDF conversion...')
      console.log('Resume file:', resume)
      
      const resumeText = await pdfToText(resume)
      
      console.log('Resume Text Length:', resumeText?.length)
      console.log('Resume Text Preview:', resumeText?.substring(0, 200))
      console.log('Title:', title)
      
      if (!resumeText || resumeText.trim() === '') {
        toast.error('Failed to extract text from PDF')
        setIsLoading(false)
        return
      }
      
      console.log('Sending request to API...')
      const {data} = await api.post('/api/ai/upload-resume', {title, resumeText}, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      
      console.log('API Response:', data)
      
      settitle('')
      setresume(null)
      setshowuploadresume(false)
      navigate(`/app/builder/${data.resume._id}`)
      setIsLoading(false)
    } catch (error) {
      console.error('Upload Error:', error)
      console.error('Error Response:', error?.response?.data)
      toast.error(error?.response?.data?.message || error.message)
      setIsLoading(false)
    }
}

  const edittitle = async (event) => {
    try {
       event.preventDefault()
        const {data} = await api.put('/api/resumes/update', {resumeid:editresumeid,resumedata:{title}}, {
      headers: {
        authorization: `bearer ${token}`
      }
    })
    setallresumes(allresumes.map(resume=>resume._id===editresumeid?{...resume,title}:resume))
    settitle('')
    seteditresumeid('')
    toast.success(data.message)

    } catch (error) {
            toast.error(error?.response?.data?.message || error.message) 
    }
   
    
  }

  const deleteresume=async (resumeid) => {

    try {
       const confirm=window.confirm("Are you sure you want to delete this resume?")
    if(confirm){
    const {data}=await api.delete(`/api/resumes/delete/${resumeid}`,{headers:{
      authorization:`bearer ${token}`}})
      setallresumes(allresumes.filter(resume=>resume._id!==resumeid))
      toast.success(data.message)
    }
    } catch (error) {
            toast.error(error?.response?.data?.message || error.message) 

      
    }
   
    
    
  }
  useEffect(()=>{
    loadallresumes() 
  },[])
  return (
    <div>
      <div className=' max-w-7xl  mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6  bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden '> Welcome, {user?.name}</p>
        <div className='flex gap-4'>
           <button onClick={()=>setshowcreatereume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500  hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition:all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
            <p className='text:sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
           </button>

            <button onClick={()=>setshowuploadresume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500  hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition:all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full'/>
            <p className='text:sm group-hover:text-purple -600 transition-all duration-300'>Upload Existing</p>
           </button>
        </div>

      <hr className='border-slate-300  my-6 sm:w-[305px]'/>

      <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
        {allresumes.map((resume,index)=>{
          const basecolor=colors[index%colors.length]
          return (
            <button key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background:`linear-gradient(135deg,${basecolor}10,${basecolor}40)`,borderColor:basecolor+'40'}}>
              <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color:basecolor}}/>
              <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:basecolor}}>{resume.title}</p>
              <p>Updated on {new Date(resume.updatedAt).toLocaleDateString()}</p>
              <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                <TrashIcon onClick={()=>deleteresume(resume._id)} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                <PencilIcon onClick={()=>{seteditresumeid(resume._id);settitle(resume.title )}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
              </div>
               </button>
          )

        })}
      </div>

         {showcreateresume &&(
          <form onSubmit={createresume} onClick={()=>setshowcreatereume(false)  } className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
              <input onChange={(e)=>settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-greem-600' required/>
              <button className='w-full py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setshowcreatereume(false);settitle('')}}/>
            </div>
          </form>
         )
          
         }

         {showuploadresume &&(
          <form onSubmit={uploadresume} onClick={()=>setshowuploadresume(false)  } className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Upload Resume</h2>
              <input onChange={(e)=>settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-greem-600' required/>
              <div>
                <label htmlFor="resume-input" className='block text-sm text-slate-700'>Select resume title
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-r-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                   {resume ? (
                    <p className='text-green-700'>{resume.title}</p>
                   ): (
                    <>
                    <UploadCloud className='size-14 stroke-1'/>
                      <p>Upload Resume</p>
                      </>
                   )
                    
                   }
                  </div>
                </label>
                <input type="file"  id="resume-input" accept='.pdf' hidden onChange={(e)=>setresume(e.target.files[0])} />
              </div>
              <button disabled={isLoading} className='w-full py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-2'>
                {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
                </button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setshowuploadresume(false);settitle('')}}/>
            </div>
          </form>

         )

         }
                  {editresumeid &&(
          <form onSubmit={edittitle} onClick={()=>seteditresumeid(false)  } className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>
            <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
              <h2 className='text-xl font-bold mb-4'>Edit Resume title</h2>
              <input onChange={(e)=>settitle(e.target.value)} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-greem-600' required/>
              <button className='w-full py-2 bg-gray-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
              <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{seteditresumeid("");settitle('')}}/>
            </div>
          </form>
         )
          
         }
      </div>

  
    </div>
  )
}

export default Dashboard