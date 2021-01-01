import React from 'react'
import { SEARCH_GYM_STAFF_ATHLETES, SEARCH_GYM_STAFF_COACHES, SEARCH_GYM_STAFF_MANAGERS } from '../../Constants/Actions/gymControls'

export default ({ 
    staff, gymName, error, searchOnChange,
    searchedGymCoaches, gymCoachesSearching,
    searchedGymManagers, searchedGymAthletes,
    gymAthletesSearching, gymManagersSearching
}) => {
    return (
        <div>
            {staff ? 
                <div>
                    <h3>{gymName} : اعضای باشگاه </h3>
                    <div>
                        <h3>مدیر باشگاه</h3>
                        <div>
                            {staff.admin.username}
                        </div>
                    </div>
                    <div>
                        <h3>منیجیر های باشگاه</h3>
                        <div>
                            <h5>جستجو</h5>
                            <input name="staffUsername" onChange={searchOnChange(SEARCH_GYM_STAFF_MANAGERS)} />
                        </div>
                        {gymManagersSearching ? 
                            <div>
                                {searchedGymManagers.length && searchedGymManagers.map(manager => (
                                    <div>{manager.username}</div>
                                ))}
                            </div> : 
                            <div>
                                {staff.managers.length && staff.managers.map(manager => (
                                    <div>{manager.username}</div>
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>مربی های باشگاه</h3>
                        <div>
                            <h5>جستجو</h5>
                            <input name="staffUsername" onChange={searchOnChange(SEARCH_GYM_STAFF_COACHES)} />
                        </div>
                        {gymCoachesSearching ? 
                            <div>
                                {searchedGymCoaches.length && searchedGymCoaches.map(coach => (
                                    <div>{coach.username}</div>
                                ))}
                            </div> : 
                            <div>
                                {staff.coaches.length && staff.coaches.map(coach => (
                                    <div>{coach.username}</div>
                                ))}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>ورزشکاران</h3>
                        <div>
                            <h5>جستجو</h5>
                            <input name="staffUsername" onChange={searchOnChange(SEARCH_GYM_STAFF_ATHLETES)} />
                        </div>
                        {gymAthletesSearching ? 
                            <div>
                                {searchedGymAthletes.length && searchedGymAthletes.map(athlete => (
                                    <div>{athlete.username}</div>
                                ))}
                            </div> :
                            <div>
                                {staff.athletes.length && staff.athletes.map(athlete => (
                                    <div>{athlete.username}</div>
                                ))}
                            </div>
                        }
                    </div>
                </div> : 
                <div>
                    {error ? error : 'خطایی پیش آمده است'}
                </div>
            }
        </div>
    )
}
