import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../../context/AppContext';
import { toast } from 'react-hot-toast';

export default function CommentTableItem({ comment, fetchComments }) {

    const { blog, createdAt, _id } = comment;
    const Blogdate = new Date(createdAt);

    const { axios } = useAppContext();

    const approveComment = async () => {
        try {
            const { data } = await axios.patch('/api/admin/approve-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const disApproveComment = async () => {
        try {
            const { data } = await axios.patch('/api/admin/disapprove-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const deleteComment = async () => {
        try {
            const confirm = window.confirm('Are u sure u want to delete this comment?')
            if (!confirm)
                return

            const { data } = await axios.get('/api/admin/delete-comment', { id: _id })
            if (data.success) {
                toast.success(data.message)
                fetchComments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> :  {blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name</b> : {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {Blogdate.toLocaleDateString()}
            </td>
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {
                        !comment.isApproved ?
                            <p onClick={comment.isApproved ? disApproveComment : approveComment} className='text-xs border cursor-pointer border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approve</p>
                            :
                            <p onClick={comment.isApproved ? disApproveComment : approveComment} className='text-xs border cursor-pointer border-red-600 bg-red-100 text-red-600 rounded-full px-3 py-1'>Unapprove</p>
                    }
                    <img onClick={deleteComment} src={assets.bin_icon} alt="" className='w-5 hover:scale-110
                    transition-all cursor-pointer' />
                </div>
            </td>
        </tr>
    )
}
