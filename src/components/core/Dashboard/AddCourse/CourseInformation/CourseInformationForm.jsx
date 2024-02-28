import React, { useEffect , useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { setStep, setCourse } from '../../../../../slices/courseSlice';
import { RequirementField } from '../RequirementField';
import IconBtn from '../../../../common/IconBtn';
const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
} = useForm();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async() => {
        setLoading(true);
        const categories = await fetchCourseCategories();
        console.log('categories -> ', categories);
        if(categories?.length > 0) {
            console.log('categories -> ', categories);
            setCourseCategories(categories);
        }
        setLoading(false);
    }
    if(editCourse) {
        setValue("courseTitle", course.courseName);
        setValue("courseShortDesc", course.courseDescription);
        setValue("coursePrice", course.price);
        setValue("courseTags", course.tag);
        setValue("courseBenefits", course.whatYouWillLearn);
        setValue("courseCategory", course.category);
        setValue("courseRequirements", course.instructions);
        setValue("courseImage", course.thumbnail);
    }
    getCategories();
  },[])
  

  // handles next button on submit
  const onSubmit = async(data) => {
     
  }

  return ( 
    <form
     onSubmit={handleSubmit(onSubmit)}
     className='rounded-md border-richblack-700bg-richblack-800 p-6 space-y-8'> 
    <div>
        <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
        <input
        id="courseTitle"
        placeholder='Enter Course Title'
        {...register("courseTitle", {required: true})}
        className='w-full text-black'
        />
        {
            errors.courseTitle && <span>Course Title is Required **</span>
        }
    </div>
    
    <div>
      <label htmlFor='courseShortDesc'>Course Short Description</label>
      <textarea
      id="courseShortDesc"
      placeholder='Enter Course Short Description'
      {...register("courseShortDesc", {required: true})}
      className='w-full min-h-[140px] text-black'
      />
      {
        errors.courseShortDesc && <span>Course Short Description is Required **</span>
      }
    </div>

    <div className='relative'>
      <label htmlFor='coursePrice'>Course Price</label>
      <input
      id="coursePrice"
      placeholder='Enter Course Price'
      {...register("coursePrice", {required: true, valueAsNumber: true})}
      className='w-full text-black'
      />
      <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400'/>    
      {
        errors.coursePrice && <span>Course Price is Required **</span>
      }
    </div>

    <div>
      <label htmlFor='courseCategory'>Course Category</label>
      <select
      id="courseCategory"
      placeholder='Enter Course Category'
      {...register("courseCategory", {required: true})}
      >
        <option value="" disabled>Choose a Category</option>
        {
          !loading && courseCategories.map((category, index) => (
            <option key={index} value={category?._id}>
               {category?.name}
            </option>
          ))
        }
      </select>
      {
        errors.courseCategory && <span>Course Category is Required **</span>
      }
    </div>
    
    {/* create a custom component for handling tags input */}
    {/* <ChipInput
    label="Tags"
    name="courseTags"
    placeholder="Enter tags and press enter"
    register={register}
    errors={errors}
    setValue={setValue}
    getValues={getValues}
    /> */}
   
    {/* create a componnent for uploading and showing preview of media */}
    {/* <Upload name="" label="" register={} errors="" setValue=""/> */}

    {/* Benefits of the course */}
    <div>
      <label htmlFor='courseBenefits'>Benefits of the Course <sup>*</sup></label>
      <textarea
      id='courseBenefits'
      placeholder='Enter the Benefits of the course'
      {...register('courseBenefits', {required: true})}
      className='min-h-[130px] w-full text-black'
      />
      {errors.courseBenefits && (<span>Benefits of the course Required **</span>)}
    </div>
    <RequirementField
    name="courseRequirements"
    label="Requirements/Instructions"
    register={register}
    errors={errors}
    setValue={setValue}
    getValues={getValues}
    />
    <div>
      {
        editCourse && (
          <button 
          onClick={() => dispatch(setStep(2))}
          className='flex items-center gap-x2 bg-richblack-300'
          >
            Continue without Saving
          </button>
        )
      }
      <IconBtn
      text={!editCourse ? "Next" : "Save Changes"}
      />
    </div>

    </form>
  )
}

export default CourseInformationForm