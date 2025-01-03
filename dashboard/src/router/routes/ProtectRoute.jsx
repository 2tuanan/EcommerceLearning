import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({route, children}) => {
    const {role, userInfo} = useSelector(state => state.auth)
    if (!role) {
        return <Navigate to="/login" replace/>
    } 
    if (route.role && userInfo) {
        if (userInfo.role != route.role) {
            return <Navigate to="/unauthorized" replace/>
        }
        if (route.status) {
            if (userInfo.status != route.status) {
                return <Navigate to={getDirectPath(userInfo.status)} replace/>
            }
        } else if (route.visibility) {
            if (!route.visibility.includes(userInfo.status)) {
                return <Navigate to="/seller/account-pending" replace/>
            }
        }
        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
    } 
    if (route.ability === 'seller') {
        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
    }   
}


    
    // if (role) {
    //     if (route.role) {
    //         if (userInfo) {
    //             if (userInfo.role === route.role) {
    //                 if (route.status) {
    //                     if (route.status == userInfo.status) {
    //                         return <Suspense fallback={null}>{children}</Suspense>
    //                     } else {
    //                         if (userInfo.status === 'pending') {
    //                             return <Navigate to="/seller/account-pending" replace/>
    //                         } else {
    //                             return <Navigate to="/seller/account-deactive" replace/>                        
    //                         }
    //                     }
    //                 } else {
    //                     if (route.visibility) {
    //                         if (route.visibility.some(r => r === userInfo.status)) {
    //                             return <Suspense fallback={null}>{children}</Suspense>
    //                         } else {
    //                             return <Navigate to="/seller/account-pending" replace/>
    //                         }
    //                     } else {
    //                         <Suspense fallback={null}>{children}</Suspense>
    //                     }
    //                 }
    //             } else {
    //                 return <Navigate to="/unauthorized" replace/>
    //             }
    //         }
    //     } else {
    //         if (route.ability === 'seller') {
    //             return <Suspense fallback={null}>{children}</Suspense>
    //         }
    //     }
    // } else {
    //     return <Navigate to="/login" replace/>
    // }


export default ProtectRoute;