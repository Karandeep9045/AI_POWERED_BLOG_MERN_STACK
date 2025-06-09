import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'

export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const fetchDashboard = async () => {
        setDashboardData(dashboard_data)
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

            <div className='flex flex-wrap gap-4'>

                {/* first card */}
                <div className='flex items-center
             gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
                    <img src={assets.dashboard_icon_1} alt="" />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
                        <p className='text-gray-400 font-light'>Blogs</p>
                    </div>
                </div>

            </div>

        </div>
    )
}
