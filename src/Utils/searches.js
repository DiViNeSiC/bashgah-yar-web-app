export const searchGym = (gyms, queries) => {
    const { gymName, gymCity } = queries
    let searchedArray = gyms != null ? gyms : null

    try {
        if (gymName) {
            searchedArray = searchedArray.filter(gym => (
                gym.name.search(new RegExp(gymName, 'i')) !== -1
            ))
        }

        if (gymCity) {
            searchedArray = searchedArray.filter(gym => (
                gym.city === parseInt(gymCity)
            ))
        }
        
        return searchedArray
    } catch (e) { return [] }
}

export const searchGymStaff = (gymStaffGroup, queries) => {
    const { staffUsername } = queries
    let searchedStaffGroup = gymStaffGroup != null ? gymStaffGroup : null

    try {
        if (staffUsername) {
            searchedStaffGroup = searchedStaffGroup.filter(user => (
                user.username.search(new RegExp(staffUsername, 'i')) !== -1
            ))
        }

        return searchedStaffGroup
    } catch (e) { return [] }
}

export const searchUser = (users, queries) => {
    let searchedArray = users != null ? users : null
    const { name, lastname, username, role } = queries

    try {
        if (name) {
            searchedArray = searchedArray.filter(user => (
                user.name.search(new RegExp(name, 'i')) !== -1
            ))
        }

        if (lastname) {
            searchedArray = searchedArray.filter(user => (
                user.lastname.search(new RegExp(lastname, 'i')) !== -1
            ))
        }

        if (username) {
            searchedArray = searchedArray.filter(user => (
                user.username.search(new RegExp(username, 'i')) !== -1
            ))
        }

        if (role) searchedArray = searchedArray.filter(user => user.role === role)

        return searchedArray
    } catch (e) { return [] }
}