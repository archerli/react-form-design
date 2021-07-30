import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { Form, Input, Row, Col, Button, Space, Checkbox, Slider } from 'antd'
import { isNil, set, get } from 'lodash-es'
import {
    DeleteOutlined
} from '@ant-design/icons';
import './index.less'

export const NormalPropertiesWrapper = forwardRef((props, ref) => {
    const { setList, list, selectItem = {}, handleSetSelectItem, children } = props
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

    useEffect(() => {
        form.resetFields()
    }, [selectItem])

    const onValuesChange = (changedValues, allValues) => {
        for (let key in changedValues) {
            if (Object.prototype.toString.call(changedValues[key]) === '[object Object]') {
                changedValues[key] = Object.assign({}, allValues[key], changedValues[key])
            }
            set(selectItem, key, changedValues[key])
        }
        let nextList = dfsUpdateList(list, selectItem)
        setList(nextList)
    }

    const dfsUpdateList = (list, item) => {
        let nextList = list.map(d => {
            if (d.key === item.key) return { ...item }

            if (d.list) {
                d.list = dfsUpdateList(d.list, item)
            }

            if (d.columns) {
                for (let col of d.columns) {
                    col.list = dfsUpdateList(col.list, item)
                }
            }
            return d
        })
        return nextList
    }

    const updateRules = (nextRules) => {
        // selectItem.rules = nextRules
        set(selectItem, 'formOptions.rules', nextRules)
        handleSetSelectItem(selectItem)
        setList(list.map(d => {
            if (d.key === selectItem.key) return { ...selectItem }
            return d
        }))
    }
    // console.log(selectItem)
    return <Form
        form={form}
        layout={'vertical'}
        initialValues={selectItem}
        onValuesChange={onValuesChange}
    >
        {isNil(get(selectItem, 'formOptions.label')) ? null : <Form.Item label={'标签'} >
            <Input
                value={get(selectItem, 'formOptions.label')}
                onChange={(e) => ref.current.triggerFieldChange('formOptions.label', e.target.value)}
                placeholder="请输入标签"
            />
        </Form.Item>}
        {children}
    </Form>
})

export const FormPropertiesWrapper = forwardRef((props, ref) => {
    const { children, ...rest } = props

    const maxSpan = 24

    const onLabelColChange = (value) => {
        // ref.current.triggerFieldChange('formOptions.wrapperCol', { span: maxSpan - value })
        ref.current.triggerFieldChange('formOptions.labelCol', { span: value })
    }

    const onWrapperColChange = (value) => {
        // ref.current.triggerFieldChange('formOptions.labelCol', { span: maxSpan - value })
        ref.current.triggerFieldChange('formOptions.wrapperCol', { span: value })
    }

    return <NormalPropertiesWrapper {...rest} ref={ref}>
        {isNil(props.selectItem.model) ? null : <Form.Item label={'数据字段'} name="model">
            <Input placeholder="请输入数据字段" />
        </Form.Item>}

        {isNil(props.selectItem.labelCol) ? null : <Form.Item label={'labelCol（水平布局生效）'} >
            <Slider onChange={onLabelColChange} value={get(props, 'selectItem.formOptions.labelCol.span')} tipFormatter={(value) => `${value} Span`} max={maxSpan} />
        </Form.Item>}

        {isNil(props.selectItem.wrapperCol) ? null : <Form.Item label={'wrapperCol（水平布局生效）'} >
            <Slider onChange={onWrapperColChange} value={get(props, 'selectItem.formOptions.wrapperCol.span')} tipFormatter={(value) => `${value} Span`} max={maxSpan} reverse />
        </Form.Item>}
        {children}
    </NormalPropertiesWrapper>
})

export const ActionProperties = (props) => {
    const { wrapRef, selectItem, attrs = ['hidden', 'disabled', 'clearable'] } = props
    const { hidden, disabled, clearable, multiple, drag, range, showTime, allowHalf, showInput, showSearch, treeCheckable, showLabel, chinesization } = selectItem.options || {}

    const showItem = (d) => attrs.find(key => key === d)

    return <Form.Item label="操作属性">
        {showItem('hidden') ? <Checkbox checked={hidden} onChange={(ev) => wrapRef.current.triggerFieldChange('options.hidden', ev.target.checked)}>隐藏</Checkbox> : null}

        {showItem('disabled') ? <Checkbox checked={disabled} onChange={(ev) => wrapRef.current.triggerFieldChange('options.disabled', ev.target.checked)}>禁用</Checkbox> : null}

        {showItem('clearable') ? <Checkbox checked={clearable} onChange={(ev) => wrapRef.current.triggerFieldChange('options.clearable', ev.target.checked)}>可清除</Checkbox> : null}

        {showItem('multiple') ? <Checkbox checked={multiple} onChange={(ev) => wrapRef.current.triggerFieldChange('options.multiple', ev.target.checked)}>多选</Checkbox> : null}

        {showItem('showSearch') ? <Checkbox checked={showSearch} onChange={(ev) => wrapRef.current.triggerFieldChange('options.showSearch', ev.target.checked)}>可搜索</Checkbox> : null}

        {showItem('range') ? <Checkbox checked={range} onChange={(ev) => wrapRef.current.triggerFieldChange('options.range', ev.target.checked)}>范围选择</Checkbox> : null}

        {showItem('showTime') ? <Checkbox checked={showTime} onChange={(ev) => wrapRef.current.triggerFieldChange('options.showTime', ev.target.checked)}>时间选择器</Checkbox> : null}

        {showItem('allowHalf') ? <Checkbox checked={allowHalf} onChange={(ev) => wrapRef.current.triggerFieldChange('options.allowHalf', ev.target.checked)}>允许半选</Checkbox> : null}

        {showItem('showInput') ? <Checkbox checked={showInput} onChange={(ev) => wrapRef.current.triggerFieldChange('options.showInput', ev.target.checked)}>输入框</Checkbox> : null}

        {showItem('drag') ? <Checkbox checked={drag} onChange={(ev) => wrapRef.current.triggerFieldChange('options.drag', ev.target.checked)}>拖拽上传</Checkbox> : null}

        {showItem('treeCheckable') ? <Checkbox checked={treeCheckable} onChange={(ev) => wrapRef.current.triggerFieldChange('options.treeCheckable', ev.target.checked)}>可勾选</Checkbox> : null}

        {showItem('showLabel') ? <Checkbox checked={showLabel} onChange={(ev) => wrapRef.current.triggerFieldChange('options.showLabel', ev.target.checked)}>显示Label</Checkbox> : null}

        {showItem('chinesization') ? <Checkbox checked={chinesization} onChange={(ev) => wrapRef.current.triggerFieldChange('options.chinesization', ev.target.checked)}>汉化</Checkbox> : null}
    </Form.Item>
}

export const ValidateProperties = (props) => {
    const { wrapRef, selectItem } = props
    const rule = get(selectItem, 'formOptions.rules[0]', {})
    return <Form.Item label="校验">
        <Checkbox
            checked={rule.required}
            onChange={(ev) => wrapRef.current.triggerFieldChange('formOptions.rules[0].required', ev.target.checked)}>必填</Checkbox>
        <Input
            value={rule.message}
            onChange={(ev) => wrapRef.current.triggerFieldChange('formOptions.rules[0].message', ev.target.value)}
            placeholder="必填校验提示信息"
        />
        <CustomRules
            data={get(selectItem, 'formOptions.rules', [])}
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

export const CustomOptions = (props) => {
    const { update, onChange, model = { label: '', value: '' }, data = [] } = props

    const onAdd = () => {
        let item = { ...model }

        item.value = data.length + 1
        item.label = `选项${item.value}`

        let nextList = [...data, item]
        update && update(nextList)
    }

    const onDelete = (index) => {
        let nextList = [...data]
        nextList.splice(index, 1)
        update && update(nextList)
    }

    return <div className="option-change-container">
        {
            data.map((d, i) => <div key={`rules_${i}`} >
                <div className="option-change-box">
                    <Row gutter={8} align="middle" style={{ marginBottom: 6 }}>
                        <Col span={9}>
                            <Input
                                placeholder="名称"
                                value={d.label}
                                onChange={(ev) => onChange(i, 'label', ev.target.value)}
                            />
                        </Col>
                        <Col span={9}>
                            <Input
                                placeholder="值"
                                value={d.value}
                                onChange={(ev) => onChange(i, 'value', ev.target.value)}
                            />
                        </Col>
                        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                shape="circle"
                                danger
                                icon={<DeleteOutlined style={{ fontSize: 14 }} />}
                                onClick={() => onDelete(i)}
                            />
                        </Col>
                    </Row>
                </div>
            </div>)
        }

        <a onClick={onAdd}>添加</a>
    </div>
}