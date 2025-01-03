import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegImages } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const AddProduct = () => {

    const categories = [
        {
            id: 1,
            name: 'Sports'
        },
        {
            id: 2,
            name: 'T-Shirts'
        },
        {
            id: 3,
            name: 'Mobiles'
        },
        {
            id: 4,
            name: 'Computers'
        },
        {
            id: 5,
            name: 'Watch'
        },
        {
            id: 6,
            name: 'Pants'
        }
    ]
    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: ''
    })

    const inputHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const [cateShow, setCateShow] = useState(false)
    const [category, setCategory] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const categorySearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let searchValue = allCategory.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
            setAllCategory(searchValue)
        } else {
            setAllCategory(categories)
        }
    }

    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    const imageHandler = (e) => {
        const files = e.target.files;
        const length = files.length;
        if (length > 0) {
          setImages([...images, ...files]);
          let imageUrls = [];
          for (let i = 0; i < length; i++) {
            let url = URL.createObjectURL(files[i]);
            imageUrls.push(url);
          }
          setImageShow([...imageShow, ...imageUrls]);
        }
    };
    console.log(images);
    console.log(imageShow);
    const changeImage = (img, index) => {
        if (img) {
            let tempUrl = imageShow;
            let tempImg = images;
            tempImg[index] = img;
            tempUrl[index] = URL.createObjectURL(img);
            setImageShow([...tempUrl]);
            setImages([...tempImg]);
        //   let url = URL.createObjectURL(img);
        //   let newImageShow = [...imageShow];
        //   newImageShow[index] = url;
        //   setImageShow(newImageShow);
        }
    }
    const removeImage = (i) => {
        const filterImage = images.filter((img, index) => index !== i);
        const filterUrl = imageShow.filter((img, index) => index !== i);
        setImages(filterImage);
        setImageShow(filterUrl);
    }   

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
                    <Link className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'>All Product</Link>
                </div>
                <div>
                    <form>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Product Name</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.name} type="text" name='name' id='name' placeholder='Product Name' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Product Brand</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.brand} type="text" name='brand' id='brand' placeholder='Brand Name' />
                            </div>
                        </div>

                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Category</label>
                                <input readOnly onClick={()=> setCateShow(!cateShow)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={category} type="text" id='category' placeholder='--Select Category--' />
                                <div className={`absolute top-[101%] bg-[#475569] w-full transition-all ${cateShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input onChange={categorySearch} className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden' type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scroll'>
                                        {
                                            allCategory.map((c, i) => <span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${category === c.name && 'bg-indigo-500'}`} onClick={() => {
                                                setCateShow(false)
                                                setCategory(c.name)
                                                setSearchValue('')
                                                setAllCategory(categories)
                                            }}>{c.name}
                                            </span>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="stock">Product Stock</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.stock} type="text" name='stock' id='stock' placeholder='Stock' />
                            </div>
                        </div>

                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="price">Price</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.price} type="number" name='price' id='price' placeholder='Price' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Discount</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.discount} type="number" name='discount' id='discount' placeholder='Discount by %' />
                            </div>
                        </div>
                        <div className='flex flex-col w-full gap-1 mb-5'>
                            <label className='text-[#d0d2d6]' htmlFor="description">Description</label>
                            <textarea className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf]
                    border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandler} value={state.description} name='description' id='description' placeholder='Description'  cols="10" rows="4"></textarea>
                        </div>
                        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6]'>
                            {
                                imageShow.map((img,i) => <div className='h-[180px] relative'>
                                    <label htmlFor={i}>
                                        <img className='w-full h-full rounded-sm' src={img} alt="" />
                                    </label>
                                    <input onChange={(e)=>changeImage(e.target.files[0],i)} type="file" id={i} className='hidden' />
                                    <span onClick={()=>removeImage(i)} className='p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg 
                                    hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full'
                                    ><IoClose /></span>
                                </div>)
                            }
                            <label className='flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full' htmlFor="image">
                                <span><FaRegImages/></span>
                                <span>Select Image</span>
                            </label>
                            <input className='hidden' onChange={imageHandler} multiple type="file" id='image' />
                        </div>
                        <div className='flex'>
                            <button className="bg-red-500 hover:shadow-red-500/40 
                            hover:shadow-md text-white rounded-md px-7 py-2 my-2"
                            >Add Product</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;