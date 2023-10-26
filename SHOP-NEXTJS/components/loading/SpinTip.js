

import { Spin } from 'antd';
import React from 'react';

function SpinTip(props) {

    const {content} = props;

    return (
        <div className='flex justify-center align-center items-center container h-full font-lg'>
            <Spin />
            <span className='ml-4 text-bold'> {content ? content : "Đợi xíu đi ...."}</span>
        </div>
    );
}

export default SpinTip;