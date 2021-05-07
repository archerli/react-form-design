import React, { useRef } from 'react';
import { Form, Input, Slider } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties } from './PropCommon'
import { replaceNum, replaceLimit } from '../../utils'

import './index.less'

const TextAreaProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, minRows, maxRows } = selectItem.options || {}
    const wrapRef = useRef()

    const onMinRowsChange = (ev) => {
        wrapRef.current.triggerFieldChange('options.minRows', replaceLimit(replaceNum(ev.target.value), 1, maxRows))
    }

    const onMaxRowChange = (ev) => {
        wrapRef.current.triggerFieldChange('options.maxRows', replaceLimit(replaceNum(ev.target.value), minRows))
    }

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item label="占位内容" name="options.placeholder" initialValue={placeholder}>
            <Input placeholder="请输入占位内容" />
        </Form.Item>

        <Form.Item label="自适应内容高度" className="site-input-group-wrapper" >
            <Input.Group compact style={{ whiteSpace: 'nowrap' }}>
                <Input
                    style={{ width: '43%', textAlign: 'center' }}
                    value={minRows}
                    onChange={onMinRowsChange}
                    placeholder="最小高度"
                />
                <Input
                    className="site-input-split"
                    style={{
                        width: '15%',
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                />
                <Input
                    className="site-input-right"
                    style={{ width: '43%', textAlign: 'center' }}
                    value={maxRows}
                    onChange={onMaxRowChange}
                    placeholder="最大高度"
                />
            </Input.Group>
        </Form.Item>

        <Form.Item label="宽度" name="options.width" initialValue={width}>
            <Slider tipFormatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            <Input placeholder="请输入默认值" />
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default TextAreaProperties;
