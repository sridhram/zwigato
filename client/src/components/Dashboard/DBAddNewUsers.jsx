import React, { useRef, useState } from 'react'
import { ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
import progressSvg from '../../assets/oval.svg';
import { addNewItem, getAllProducts } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../../context/actions/productActions';
import { alertNull, alertSuccess } from '../../context/actions/alertActions';
import {motion} from 'framer-motion';
import { animateClick } from '../../animations';
const imgRef = {};

const InputBox = ({type, placeholder, isRequired=false, minVal, name}) =>{
  if(minVal){
    return(
      <input name={name} className='p-2 rounded-md border shadow-md outline-[#ff6c6c]' type={type} placeholder={placeholder} required={isRequired} min={minVal} />
    )
  }
  return(
    <input name={name} className='p-2 rounded-md border shadow-md outline-[#ff6c6c]' type={type} placeholder={placeholder} required={isRequired} />
  )
}

const CategorySection = ({ list, selectedCategories, setSelectedCategories }) => {
  const selectCategory = () => {
    if(event.target.classList.contains('selected-category')){
      event.target.classList.remove('selected-category');
      setSelectedCategories(selectedCategories.filter((arrElem) => {
        return arrElem != event.target.id;
      }));
    }else{
      event.target.classList.add('selected-category');
      setSelectedCategories([...selectedCategories, event.target.id]);
    }
  }
  return(
    <section className='grid grid-cols-[repeat(auto-fill,_25%)] gap-4 justify-evenly p-4 rounder-lg border'>
      {list.map((category) => {
        return <div onClick={selectCategory} id={category.id} className='p-2 text-center border rounded-sm text-gray-500 cursor-pointer hover:border-[#ff6c6c]' key={category.id}>{category.category}</div>
      })}
    </section>
  )
}

const ImgDiv = ({ imgSrc, alt = "uploaded image", imgState, setImgState}) => {
  const deletePic = () => {
    const imgStorageRef = imgRef[imgSrc];
    deleteObject(imgStorageRef).then(() => {
      setImgState(imgState.filter((imgURL) => {
        return(imgURL !== imgSrc);
      }));
    }).catch((error) => {
      console.log(error);
    });

  }
  return(
      <div className='flex relative group'>
        <img className='w-[150px] h-[150px] border rounded-md' src={imgSrc} alt={alt} />
      <div className='w-[150px] h-[150px] z-10 group-hover:bg-[rgba(0,0,0,0.5)] absolute'></div>
      <XCircleIcon onClick={deletePic} className='w-8 h-8 cursor-pointer text-white hidden absolute top-[50%] left-[50%] z-20 translate-x-[-50%] translate-y-[-50%] group-hover:block' />
      </div>
  )
}

const DBAddNewUsers = () => {
  const imgDivRef = useRef();
  const uploadProgressRef = useRef();
  const [imgURLArr, setImgURLArr] = useState([]);

  const dispatch = useDispatch();
  const productsList = useSelector(state => state.products);

  const categories = [
    { id: 1, category: 'Drinks' },
    { id: 2, category: 'Desserts' },
    { id: 3, category: 'Vegetables and Fruits' },
    { id: 4, category: 'Snacks' },
    { id: 5, category: 'Dairy' },
    { id: 6, category: 'Masala & Dry Fruits' },
    { id: 7, category: 'Meats, Fish & Eggs' },
  ]

  const [selectedCategories, setSelectedCategories] = useState([]);

  const showImgProgress = (val) =>{
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
            imgRef[imgURL] = storageRef;
            setImgURLArr([...imgURLArr, imgURL]);
          })
        }
      );
    }
    
  }

  const saveNewItem = async () => {
    event.preventDefault();
    const selectedCategoriesArr = [];
    selectedCategories.forEach((category) => {
      selectedCategoriesArr.push(categories[category-1].category);
    });
    const data = {
      name: event.target.elements.name.value,
      categories: selectedCategoriesArr,
      price: event.target.elements.price.value,
      imgURLs: imgURLArr,
    }
    const resp = await addNewItem(data);
    if(resp.status === 200){
      if(!productsList){
        const productsList = await getAllProducts();
        productsList.json().then((products) => {
          dispatch(setAllProducts(products.data));
        });
      }else{
        resp.json().then((newProdData) => {
          dispatch(setAllProducts([...productsList, newProdData.data]));
        });
      }
      dispatch(alertSuccess("product added successfully"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 2000);
    }
  }

  return (
    <form onSubmit={saveNewItem} className='m-8 p-8 flex flex-col gap-4 rounded-md border'>
      <InputBox type="text" placeholder="Item name" name="name" isRequired={true} />
      <CategorySection list={categories} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <InputBox type="number" placeholder="Item price" name="price" isRequired={true} minVal={1} />
      <section className='border rounded-lg flex items-center justify-center gap-4 p-4 flex-wrap' ref={imgDivRef}>
        <label className="w-[150px] h-[150px] flex gap-1 items-center justify-center rounded-lg cursor-pointer border">
          <input type="file" className='hidden' onChange={uploadImage} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" />
          <ArrowUpTrayIcon className='w-5 h-5' />
          Upload
        </label>
        {
          imgURLArr && imgURLArr.map((imgURL, index) => {
            return(
              <ImgDiv key={index} imgSrc={imgURL} imgState={imgURLArr} setImgState={setImgURLArr} />
            )
          })
        }
        <ProgressDiv elemRef={uploadProgressRef}/>
      </section>
      <motion.button {...animateClick} className='bg-[#ff6c6c] text-white p-2 rounded-lg w-[70%] self-center'>Save</motion.button>
    </form>
  )
}

export default DBAddNewUsers