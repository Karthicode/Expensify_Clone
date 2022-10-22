import {GoogleLogout} from 'react-google-login'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDataFromStore } from '../../store/state/StateProvider';
import { actions } from '../../store/actions';

export const GoogleLogoutBtn = () =>{
    const [{dialog},dispatch] = useDataFromStore();
    const history = useNavigate();

    const handleLogout = async (response) => {
        const result = response?.profileObj;
        const token = response?.tokenId;

        try {
         dispatch({
              data: {result, token }, type: actions.LOGOUT
            })
            history('/dashboard',{replace:true});
        } catch (err) {
            console.error(err.response.data);
        }
    }
    return (
        <GoogleLogout
             clientId="770429347480-4qllhg19j5jp83ga5dg1vbtthrm9634n.apps.googleusercontent.com"
                buttonText="Log in with Google"
                theme='dark'
                className='google-signout-button'
                onLogoutSuccess={handleLogout}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
        />
    )
}