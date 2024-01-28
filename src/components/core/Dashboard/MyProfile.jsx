import React from 'react'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn';
function MyProfile() {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
    console.log('myprofile -> ', user);

  return (
    <div className='text-white w-11/12 max-w-maxContent'>
        <h1>My profile</h1>

        {/* section 1 */}
        <div>
            <div>
               <img src={user?.image} alt={`profile-${user?.firstName}`}
               className='aspect-square w-[70px] rounded-full object-cover'
               />
                <div>
                    <p>{user?.firstName + " " + user?.lastName }</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <IconBtn
            text="edit"
            onClick={() => {
                navigate('/dashboard/settings')
            }}
            />
        </div>
        {/* section 2 */}
        <div>
            <div>
                <p>About</p>
                <IconBtn text="Edit" onClick={() => {navigate("/dashboard/settings")}}/>
            </div>
            <p>{user?.additionalDetails?.about ?? "Write something about yourself" }</p>
        </div>
        {/* section 3 */}
        <div>
            <div>
                <p>Personal Details</p>
                <IconBtn text="Edit" onClick={() => {navigate("/dashboard/settings")}}/>
                <div>
                    <div>
                        <p>FirstName</p>
                        <p>{user?.firstName}</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>{user?.email}</p>
                    </div>
                    <div>
                        <p>Gender</p>
                        <p>{user?.additionalDetails?.gender ?? "Add Gender "}</p>
                    </div>
                    <div>
                        <p>Lastname</p>
                        <p>{user?.lastName}</p>
                    </div>
                    <div>
                        <p>Phone Number</p>
                        <p>{user?.additionalDetails?.contactNumber ?? "Add Contact Number "}</p>
                    </div>
                    <div>
                        <p>Date of birth</p>
                        <p>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile