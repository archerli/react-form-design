import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Checkbox, Radio } from 'antd'
import { FormPropertiesWrapper, ActionProperties, ValidateProperties, CustomOptions } from './PropCommon'

const RadioProperties = (props) => {
    const { selectItem } = props
    const { width, placeholder, defaultValue, options, dynamic } = selectItem.options || {}
    const wrapRef = useRef()

    const onDynamicChange = (e) => {
        wrapRef.current.triggerFieldChange('options.dynamic', e.target.value)
    }

    const onDynamicKeyChange = (e) => {
        wrapRef.current.triggerFieldChange('options.dynamicKey', e.target.value)
    }

    const onOptionsChange = (index, field, value) => {
        let nextList = [...options]
        nextList[index][field] = value
        onOptionsUpdate(nextList)
    }

    const onOptionsUpdate = (nextOptions) => {
        wrapRef.current.triggerFieldChange('options.options', nextOptions)
    }

    return <FormPropertiesWrapper ref={wrapRef} {...props}>
        <Form.Item label="选项配置" >
            <Radio.Group buttonStyle="solid" value={dynamic} onChange={onDynamicChange}>
                <Radio.Button value={false}>静态数据</Radio.Button>
                <Radio.Button value={true}>动态数据</Radio.Button>
            </Radio.Group>

            {dynamic ?
                <Input
                    style={{ marginTop: '6px' }}
                    placeholder="动态数据变量名"
                    onChange={onDynamicKeyChange}
                /> :
                <CustomOptions
                    data={options}
                    update={onOptionsUpdate}
                    onChange={onOptionsChange}
                />
            }
        </Form.Item>

        <Form.Item label="默认值" name="options.defaultValue" initialValue={defaultValue}>
            {dynamic ? <Input placeholder="请输入默认值" /> : <Radio.Group
                options={options}
            />}
        </Form.Item>

        {/* 操作属性 */}
        <ActionProperties {...props} wrapRef={wrapRef} attrs={['hidden', 'disabled']} />

        {/* 校验属性 */}
        <ValidateProperties {...props} wrapRef={wrapRef} />

    </FormPropertiesWrapper>
}

export default RadioProperties;
