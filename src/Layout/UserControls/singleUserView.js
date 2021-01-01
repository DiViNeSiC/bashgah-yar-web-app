import React from 'react'
import { ATHLETE_ROLE, GYM_ADMIN_ROLE, GYM_COACH_ROLE, GYM_MANAGER_ROLE, SITE_ADMIN_ROLE } from '../../Constants/roles'

export default ({ loggedUser, userRoleText, selectedUser, userControlsErr, onDeleteStaffById }) => {
    return (
        <div>
            {selectedUser ? 
                <div>
                    <div>
                        <div>{selectedUser.username}</div>
                        <div>{userRoleText(selectedUser.role)}</div>
                    </div>
                    <div>
                        {loggedUser?.role === GYM_MANAGER_ROLE && 
                            (selectedUser.role === GYM_COACH_ROLE || selectedUser.role === ATHLETE_ROLE) && 
                            <button onClick={onDeleteStaffById(selectedUser._id)}>پاک کردن حساب</button>
                        }
                        {loggedUser?.role === GYM_ADMIN_ROLE && selectedUser.role !== SITE_ADMIN_ROLE && 
                            <button onClick={onDeleteStaffById(selectedUser._id)}>پاک کردن حساب</button>
                        }
                    </div>
                </div> : 
                <div>
                    {userControlsErr ? userControlsErr : 'خطایی پیش آمده است'}
                </div>
            }
        </div>
    )
}
