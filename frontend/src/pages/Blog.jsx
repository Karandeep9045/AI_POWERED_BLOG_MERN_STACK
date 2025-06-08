import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { assets, blog_data, comments_data } from '../assets/assets'
import Momemt from 'moment'

export default function Blog() {

  const { id } = useParams()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])

  const fetchBlogData = async () => {
    const data = blog_data.find(item => item._id === id)
    setData(data)
  }

  const fetchComments = async () => {
    setComments(comments_data)
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt=""
        className='absolute -top-50 -z-1 opacity-50' />

      <Navbar />

      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'> Published on {Momemt(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michael Brown</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5' />

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML=
          {{ __html: data.description }}></div>
        {/* comment section */}

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'> Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary max-w-xl p-4 rounded text-grey-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'> {item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Momemt(item.createdAt).fromNow}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>

  ) : <div>Loading...</div>
}
