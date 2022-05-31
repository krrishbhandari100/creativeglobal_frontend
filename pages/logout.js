import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        localStorage.removeItem('token');
        router.push('/');
    }, [])
    return (
        <div>

        </div>
    )
}

export default Logout
