import React from 'react'
import cities from '../../Constants/cities'
import baseUrl from '../../Constants/backendUrl'
import { Link } from 'react-router-dom'

export default ({ gyms, error, searchType, isSearching, adminUsername, searchedGyms, searchOnChange }) => {
    return (
        <div>
            <h3>{adminUsername} باشگاه های </h3>
            {gyms?.length > 0 ? 
                <div>
                    <div>
                        <input name="gymName" type="text" onChange={searchOnChange(searchType)} />
                        <select name="gymCity" onChange={searchOnChange(searchType)}>
                            <option value="">خالی</option>
                            {cities.map(city => (<option value={city.value}>{city.name}</option>))}
                        </select>
                    </div>
                    {isSearching ? 
                        <>
                            {searchedGyms.map(gym => (
                                <div>
                                    <div>
                                        {gym.gymImagePaths.map(imgPath => (
                                            <>
                                                <img alt="" style={{ width: 70, height: 70 }} src={`${baseUrl}/${imgPath}`} />
                                            </>
                                        ))}
                                    </div>
                                    <div>
                                        <span>نام باشگاه</span>
                                        <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
                                    </div>
                                    <div>
                                        <span>شهر</span>
                                        <span>{cities.find(city => city.value === gym.city).name}</span>
                                    </div>
                                </div>
                            ))}
                        </> :
                        <>
                            {gyms.map(gym => (
                                <div>
                                    <div>
                                        {gym.gymImagePaths.map(imgPath => (
                                            <>
                                                <img alt="" style={{ width: 70, height: 70 }} src={`${baseUrl}/${imgPath}`} />
                                            </>
                                        ))}
                                    </div>
                                    <div>
                                        <span>نام باشگاه</span>
                                        <Link to={`/gyms/${gym._id}`}>{gym.name}</Link>
                                    </div>
                                    <div>
                                        <span>شهر</span>
                                        <span>{cities.find(city => city.value === gym.city).name}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div> :
                <div>
                    {error ? <div>{error}</div> : <div>باشگاهی وجود ندارد</div>}
                </div>
            }
        </div>
    )
}
