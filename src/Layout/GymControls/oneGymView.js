import React from 'react'
import cities from '../../Constants/cities'
import baseUrl from '../../Constants/backendUrl'

export default ({ gym, error }) => {
    return (
        <div>
            {gym ? 
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
                        <span>{gym.name}</span>
                    </div>
                    <div>
                        <span>شهر</span>
                        <span>{cities.find(city => city.value === gym.city).name}</span>
                    </div>
                </div> : 
                <div>{error ? error : 'خطا'}</div>
            }
        </div>
    )
}
