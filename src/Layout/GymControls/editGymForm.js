import React from 'react'
import baseUrl from '../../Constants/backendUrl'
import cities from '../../Constants/cities'
import { Link } from 'react-router-dom'

export default ({
    onClickGymPicInput, onDeleteGymAccount,
    onDeleteOnePicture, onDeleteAllPictures,
    gymPicOnChange, gym, gymInfo, onEditInfo,
    uploadingImage, onAddPicture, onClearNewPic,
    gymInfoOnChange, gymPicInputRef, gymControlsErr,
}) => {
    return (
        <>
            {gym ? 
                <div>
                    <div>
                        {gym.gymImageNames?.length > 0 && <button type="button" onClick={onDeleteAllPictures}>پاک کردن تمامی عکس ها</button>}
                        {gym.gymImagePaths.map(imgPath => (
                            <>
                                <img onClick={() => onDeleteOnePicture(imgPath)} alt="" style={{ width: 70, height: 70 }} src={`${baseUrl}/${imgPath}`} />
                            </>
                        ))}
                        <input type="file" onChange={gymPicOnChange} ref={gymPicInputRef} hidden />
                        {uploadingImage && <img alt="" style={{ width: 70, height: 70 }} src={uploadingImage} />}
                        {uploadingImage && <button type="button" onClick={onAddPicture}>اضافه کردن عکس</button>}
                        {uploadingImage && <button type="button" onClick={onClearNewPic}>انصراف</button>}
                        <button type="button" onClick={onClickGymPicInput}>انتخاب عکس</button>
                    </div>
                    <div>
                        <form onSubmit={onEditInfo}>
                            <div>
                                <input value={gymInfo.name || ''} required onChange={gymInfoOnChange} name="name" type="text" />
                                <input value={gymInfo.capacity || ''} required onChange={gymInfoOnChange} name="capacity" type="number" />
                                <input value={gymInfo.phoneNumber || ''} required onChange={gymInfoOnChange} name="phoneNumber" type="text" />
                                <textarea value={gymInfo.address || ''} required onChange={gymInfoOnChange} name="address" />
                            </div>
                            <div>city: {cities.find(city => city.value === gym.city).name}</div>
                            <div>
                                <button type="submit">ویرایش</button>
                            </div>
                            <div>
                                <Link to={`/gyms/staff/${gym._id}`}>مشاهده اعضا</Link>
                            </div>
                        </form>
                    </div>
                    <div>
                        <button onClick={onDeleteGymAccount} type="button">پاک کردن باشگاه</button>
                    </div>
                </div> : 
                <div>
                    {gymControlsErr && <span>{gymControlsErr}</span>}
                </div>
            }
        </>
    )
}