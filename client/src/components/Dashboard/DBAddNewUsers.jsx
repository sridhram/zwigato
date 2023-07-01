import React, { useRef, useState } from 'react'
import { ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import progressSvg from '../../assets/oval.svg';

const InputBox = ({type, placeholder, isRequired=false, minVal}) =>{
  if(minVal){
    return(
      <input className='p-2 rounded-md border shadow-md outline-[#ff6c6c]' type={type} placeholder={placeholder} required={isRequired} min={minVal} />
    )
  }
  return(
    <input className='p-2 rounded-md border shadow-md outline-[#ff6c6c]' type={type} placeholder={placeholder} required={isRequired} />
  )
}

const CategorySection = ({ list, selectedCategories }) => {
  const selectCategory = () => {
    if(event.target.classList.contains('selected-category')){
      event.target.classList.remove('selected-category');
      selectedCategories.splice(selectedCategories.indexOf(event.target.id),1);
    }else{
      event.target.classList.add('selected-category');
      selectedCategories.push(event.target.id);
    }
  }
  return(
    <section className='grid grid-cols-[repeat(auto-fill,_25%)] gap-4 justify-evenly'>
      {list.map((category) => {
        return <div onClick={selectCategory} id={category.id} className='p-2 text-center border rounded-sm text-gray-500 cursor-pointer hover:border-[#ff6c6c]' key={category.id}>{category.category}</div>
      })}
    </section>
  )
}

const ImgDiv = ({imgSrc, alt="uploaded image"}) => {
  return(
      <div className='flex relative group'>
        <img className='w-[150px] h-[150px] border rounded-md' src={imgSrc} alt={alt} />
      <div className='w-[150px] h-[150px] z-10 hover:bg-[rgba(0,0,0,0.2)] absolute'></div>
      <XCircleIcon className='w-8 h-8 cursor-pointer hidden absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] group-hover:block' />
      </div>
  )
}

const DBAddNewUsers = () => {
  const imgDivRef = useRef();
  const uploadProgressRef = useRef();
  const [imgURLArr, setImgURLArr] = useState([]);
  const categories = [
    { id: 1, category: 'Drinks' },
    { id: 2, category: 'Desserts' },
    { id: 3, category: 'Vegetables and Fruits' },
    { id: 4, category: 'Snacks' },
    { id: 5, category: 'Dairy' },
    { id: 6, category: 'Masala & Dry Fruits' },
    { id: 7, category: 'Meats, Fish & Eggs' },
  ]

  const selectedCategories = [];

  const showImgProgress = (val) =>{
    console.log(val);
    if(val > 0){
      uploadProgressRef.current.classList.remove('hidden');
    }else if(val >= 100){
      uploadProgressRef.current.classList.add('hidden');
    }
  }

  const ProgressDiv = ({ elemRef }) => {
    return(
      <div className='hidden w-[150px] h-[150px] border rounded-md bg-gray-300 grid place-content-center' ref={elemRef}>
        <img src={progressSvg} alt="progress" />
      </div>
    )
  }

  const uploadImage = () => {
    for(const imgFile of event.target.files){
      const storageRef = ref(getStorage(), `Images/${Date.now()}_${imgFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on('state_changed',
        (imgTransfer) => {
          showImgProgress((imgTransfer.bytesTransferred / imgTransfer.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((imgURL) => {
            setImgURLArr([...imgURLArr, imgURL]);
          })
        }
      );
    }
    
  }

  return (
    <article className='m-8 p-8 flex flex-col gap-4 rounded-md border'>
      <InputBox type="text" placeholder="Item name" isRequired={true} />
      <CategorySection list={categories} selectedCategories={selectedCategories} />
      <InputBox type="number" placeholder="Item price" isRequired={true} minVal={1} />
      <section className='border rounded-sm flex items-center justify-center gap-4 p-4 flex-wrap' ref={imgDivRef}>
        <label className="w-[150px] h-[150px] flex gap-1 items-center justify-center rounded-lg bg-sec-text-light/20 cursor-pointer border">
          <input type="file" className='hidden' onChange={uploadImage} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" />
          <ArrowUpTrayIcon className='w-5 h-5' />
          Upload
        </label>
        {
          imgURLArr && imgURLArr.map((imgURL, index) => {
            return(
              <ImgDiv key={index} imgSrc={imgURL} />
            )
          })
        }
        <ProgressDiv elemRef={uploadProgressRef}/>
      </section>
    </article>
  )
}

export default DBAddNewUsers