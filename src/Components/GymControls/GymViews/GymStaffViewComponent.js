import React, { useEffect } from 'react'
import useView from '../CustomHooks/useView'
import StaffView from '../../../Layout/GymControls/staffView'

export default () => {
    const { 
        searchedGymCoaches, searchedGymManagers, searchedGymAthletes,
        searchQueryOnChange, gymCoachesSearching, gymManagersSearching, 
        gymAthletesSearching, onGetGymStaff, gymName, gymStaff, gymControlsErr, 
    } = useView()

    useEffect(onGetGymStaff, [])
    return <StaffView
        staff={gymStaff}
        gymName={gymName}
        error={gymControlsErr}
        searchOnChange={searchQueryOnChange}
        searchedGymCoaches={searchedGymCoaches}
        gymCoachesSearching={gymCoachesSearching}
        searchedGymManagers={searchedGymManagers}
        searchedGymAthletes={searchedGymAthletes}
        gymAthletesSearching={gymAthletesSearching}
        gymManagersSearching={gymManagersSearching}
    />
}