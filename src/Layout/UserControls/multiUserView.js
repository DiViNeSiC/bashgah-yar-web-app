import React from 'react'
import { Link } from 'react-router-dom'

export default ({ users, error, searchType, isSearching, searchedUsers, searchOnChange, userRoleText }) => {
    return (
        <div>
            {users ?
                <div>
                    <div>
                        <input placeholder="نام کاربری" name="username" onChange={searchOnChange(searchType)} />
                        <input placeholder="نام" name="name" onChange={searchOnChange(searchType)} />
                        <input placeholder="نام خانوادگی" name="lastname" onChange={searchOnChange(searchType)} />
                    </div>
                    {isSearching ? 
                        <div>
                            {searchedUsers.map(user => (
                                <div>
                                    <div>{user.username}</div>
                                    <div>{userRoleText(user.role)}</div>
                                    <Link to={`/users/${user._id}`}>مشاهده</Link>
                                </div>
                            ))}
                        </div> :
                        <div>
                            {users.map(user => (
                                <div>
                                    <div>{user.username}</div>
                                    <div>{userRoleText(user.role)}</div>
                                    <Link to={`/users/${user._id}`}>مشاهده</Link>
                                </div>
                            ))}
                        </div>
                    }
                </div> : 
                <div>
                    {error ? error : 'خطایی پیش آمده'}
                </div>
            }
        </div>
    )
}