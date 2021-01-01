import React from 'react'

export default ({ avatarInputRef, displayFile, onClickAvatarInput, onPickFile, onDeleteFile }) => {
    return (
        <>
            <input type="file" ref={avatarInputRef} hidden onChange={onPickFile} />
            <div>
                <img alt="" src={displayFile} style={{ height: 40, width: 40 }} />
                <div onClick={onClickAvatarInput}>+</div>
                <button type="button" onClick={onDeleteFile()}>پاک کردن آواتار</button>
            </div>
        </>
    )
}
