import React from 'react';
import { FaEdit, FaRegImages } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const Profile = () => {
    const image = true;
    const loader = true;
    return (
        <div className='px-2 lg:px-7 py-5'>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-6/12'>
                    <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
                        <div className='flex justify-center items-center py-3'>
                            {
                                image ? <label htmlFor="img" className='h-[150px] w-[200px] relative p-3 cursor-pointer
                                overflow-hidden'>
                                    <img src="http://localhost:3000/images/demo.jpg" alt="" />
                                    {
                                        !loader && <div className='absolute top-0 left-0 w-full h-full 
                                        bg-slate-600 opacity-70 flex justify-center items-center
                                        z-20'>
                                            <span>
                                                <FadeLoader color={'#d0d2d6'} loading={loader} size={50} />
                                            </span>
                                        </div> 
                                    }
                                </label> : <label className='flex justify-center items-center flex-col 
                                h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 
                                border-[#d0d2d6] relative' 
                                htmlFor='img'>
                                    <span><FaRegImages/></span>
                                    <span>Select Image</span>
                                    {
                                        loader && <div className='absolute top-0 left-0 w-full h-full 
                                        bg-slate-600 opacity-70 flex justify-center items-center
                                        z-20'>
                                            <span>
                                                <FadeLoader color={'#d0d2d6'} loading={loader} size={50} />
                                            </span>
                                        </div> 
                                    }
                                </label>
                            }
                            <input type="file" className='hidden' id='img' />
                        </div>

                        <div className='px-0 md:px-5 py-2'>
                            <div className='flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800
                            rounded-md relative'>
                                <span className='p-[6px] bg-yellow-500 rounded hover:shadow-lg 
                                hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer'><FaEdit/></span>
                                <div className='flex gap-2'>
                                    <span>Name: </span>
                                    <span>James MM</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Email: </span>
                                    <span>james@gmail.com</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Role: </span>
                                    <span>Seller</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Status: </span>
                                    <span>Active</span>
                                </div>
                                <div className='flex gap-2'>
                                    <span>Payment Account: </span>
                                    <span>Pending</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-6/12'>
                    <div> </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;