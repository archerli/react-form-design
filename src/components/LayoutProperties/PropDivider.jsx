import React, { useRef } from 'react';
import { Form, Radio, Input, Select, Slider, Checkbox } from 'antd'
import { NormalPropertiesWrapper } from './PropCommon'

const DividerProperties = (props) => {
    const { selectItem } = props
    const { width } = selectItem.options || {}
    const wrapRef = useRef()

    return <NormalPropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item
            label="标签位置"
            name="options.orientation"
            initialValue={selectItem.options.orientation}
        >
            <Radio.Group buttonStyle="solid" >
                <Radio.Button value="left">左</Radio.Button>
                <Radio.Button value="">居中</Radio.Button>
                <Radio.Button value="right">右</Radio.Button>
            </Radio.Group>
        </Form.Item>
    </NormalPropertiesWrapper>
}

export default DividerProperties;
