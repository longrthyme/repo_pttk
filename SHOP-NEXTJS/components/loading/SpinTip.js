

import { Spin } from 'antd';
import React from 'react';

function SpinTip(props) {
    return (
        <div className='flex justify-center align-center items-center container h-full font-lg'>
            <Spin />
        </div>
    );
}

export default SpinTip;