import React from 'react'
import cities from '../../../Constants/cities'
import GymPicsInput from '../Partials/gymPicsInput'

export default ({ onChange, formValue, gymPicsHandler, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>ثبت باشگاه جدید</h2>
            </div>
            <div>
                <GymPicsInput {...gymPicsHandler} />
            </div>
            <div>
                <div>
                    <label>نام</label>
                    <input 
                        required 
                        name="name"
                        type="text"
                        onChange={onChange}
                        value={formValue.name || ''}
                    />
                </div>
                <div>
                    <label>شماره تلفن</label>
                    <input 
                        required 
                        name="phoneNumber"
                        type="text"
                        onChange={onChange}
                        value={formValue.phoneNumber || ''}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label>شهر</label>
                    <select onChange={onChange} name="city">
                        {cities.map(city => (
                            <option value={city.value}>{city.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>آدرس</label>
                    <textarea 
                        required 
                        name="address"
                        onChange={onChange}
                        value={formValue.address || ''}
                    />
                </div>
            </div>
            <div>
                <div>
                    <label>ظرفیت باشگاه</label>
                    <input 
                        required
                        name="capacity"
                        type="number"
                        onChange={onChange}
                        value={formValue.capacity || ''}
                    />
                </div>
            </div>
            <div>
                <button type="submit">ثبت</button>
            </div>
        </form>
    )
}
