import React from 'react'

export default ({ displayFiles, gymPicsInputRef, onClickGymPicsInput, onPickFile, onDeleteFile, deleteAllFiles }) => {
    return (
        <>
            <input type="file" ref={gymPicsInputRef} hidden onChange={onPickFile} />
            <div>
                {displayFiles && displayFiles.map(file => (
                    <div key={file}>
                        <img alt="" src={file} style={{ height: 40, width: 40 }} />
                        <button type="button" onClick={onDeleteFile(file)}>پاک کردن آواتار</button>
                    </div>
                ))}
                <div onClick={onClickGymPicsInput}>اضافه کردن عکس</div>
                <div onClick={deleteAllFiles()}>پاک کردن همه عکس ها</div>
            </div>
        </>
    )
}
