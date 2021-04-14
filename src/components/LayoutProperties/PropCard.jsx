import React, { useRef } from 'react';
import { NormalPropertiesWrapper } from './PropCommon'
import './index.less'

const CardProperties = (props) => {
    const { selectItem } = props
    const wrapRef = useRef()
    return <NormalPropertiesWrapper ref={wrapRef} {...props} >
    </NormalPropertiesWrapper>
}

export default CardProperties;
