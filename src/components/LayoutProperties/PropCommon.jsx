import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Form, Input, Row, Col, Button, Space, Checkbox } from 'antd'
import { isNil, set } from 'lodash-es'
import {
    DeleteOutlined
} from '@ant-design/icons';
import './index.less'

export const NormalPropertiesWrapper = forwardRef((props, ref) => {
    const { setList, list, selectItem = {}, children } = props
    const [form] = Form.useForm()

    useImperativeHandle(ref, () => ({
        getForm: () => {
            return form
        },
        triggerFieldChange: (key, value) => {
            let changedValues = { [key]: value }
            form.setFieldsValue(changedValues)
            onValuesChange(changedValues, form.getFieldsValue())
        },
        triggerChange: onValuesChange,
        updateRules: updateRules
    }))


    const onValuesChange = (changedValues, allValues) => {
        for (let key in changedValues) {
            set(selectItem, key, changedValues[key])
        }
        // console.log(selectItem)
        setList(list.map(d => {
            if (d.key === selectItem.key) return { ...selectItem }
            return d
        }))
    }

    const updateRules = (nextRules) => {
        selectItem.rules = nextRules
        setList(list.map(d => {
            if (d.key === selectItem.key) return { ...selectItem }
            return d
        }))
    }

    return <Form
        form={form}
        layout={'vertical'}
        initialValues={selectItem}
        onValuesChange={onValuesChange}
    >
        {isNil(selectItem.label) ? null : <Form.Item label={'标签'} name="label">
            <Input placeholder="请输入标签" />
        </Form.Item>}
        {children}
    </Form>
})

export const FormPropertiesWrapper = forwardRef((props, ref) => {
    const { children, ...rest } = props

    return <NormalPropertiesWrapper {...rest} ref={ref}>
        {isNil(props.selectItem.model) ? null : <Form.Item label={'数据字段'} name="model">
            <Input placeholder="请输入数据字段" />
        </Form.Item>}
        {children}
    </NormalPropertiesWrapper>
})

export const ActionProperties = (props) => {
    const { wrapRef, selectItem } = props
    const { hidden, disabled, clearable } = selectItem.options || {}
    return <Form.Item label="操作属性">
        <Checkbox defaultValue={hidden} onChange={(ev) => wrapRef.current.triggerFieldChange('options.hidden', ev.target.checked)}>隐藏</Checkbox>

        <Checkbox defaultValue={disabled} onChange={(ev) => wrapRef.current.triggerFieldChange('options.disabled', ev.target.checked)}>禁用</Checkbox>

        <Checkbox defaultValue={clearable} onChange={(ev) => wrapRef.current.triggerFieldChange('options.clearable', ev.target.checked)}>可清除</Checkbox>
    </Form.Item>
}

export const ValidateProperties = (props) => {
    const { wrapRef, selectItem } = props
    return <Form.Item label="校验">
        <Checkbox
            defaultValue={selectItem.rules[0].required}
            onChange={(ev) => wrapRef.current.triggerFieldChange('rules[0].required', ev.target.checked)}>必填</Checkbox>
        <Input
            defaultValue={selectItem.rules[0].message}
            onChange={(ev) => wrapRef.current.triggerFieldChange('rules[0].message', ev.target.value)}
            placeholder="必填校验提示信息"
        />
        <CustomRules
            data={selectItem.rules}
            updateRules={wrapRef.current && wrapRef.current.updateRules}
        />
    </Form.Item>
}

export const CustomRules = (props) => {
    const { updateRules, data = [] } = props

    const onAddRules = () => {
        let nextList = [...data, { pattern: '', message: '' }]
        updateRules && updateRules(nextList)
    }

    const onDelete = (index) => {
        let nextList = [...data]
        nextList.splice(index, 1)
        updateRules && updateRules(nextList)
    }

    const onInput = (index, field, ev) => {
        let nextList = [...data]
        nextList[index][field] = ev.target.value
        updateRules && updateRules(nextList)
    }

    return <div className="option-change-container">
        {
            data.slice(1).map((d, i) => <div key={`rules_${i}`} >
                <div className="option-change-box">
                    <Row gutter={8} align="middle">
                        <Col span={18}>
                            <Space style={{ width: '100%' }} direction="vertical">
                                <Input
                                    placeholder="提示信息"
                                    value={d.message}
                                    onChange={(ev) => onInput(i + 1, 'message', ev)}
                                />
                                <Input
                                    placeholder="正则表达式pattern"
                                    value={d.pattern}
                                    onChange={(ev) => onInput(i + 1, 'pattern', ev)}
                                />
                            </Space>
                        </Col >
                        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                shape="circle"
                                danger
                                icon={<DeleteOutlined style={{ fontSize: 14 }} />}
                                onClick={() => onDelete(i + 1)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>)
        }

        <a onClick={onAddRules}>增加校验</a>
    </div>
}