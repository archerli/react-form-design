import React, { memo, useEffect, useState } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch, Input, InputNumber, Divider, Select, Checkbox, Radio, DatePicker, TimePicker, Rate, Slider } from 'antd'
import GridItem from './GridItem'
import CardItem from './CardItem'
import TabsItem from './TabsItem'
import TableItem from './TableItem'
import FormItemDragWrap from './FormItemDragWrap'
import { CodepenOutlined } from '@ant-design/icons';

import './index.less'
export {
  GridItem,
  CardItem,
  TabsItem,
  TableItem,
}

const { RangePicker } = DatePicker

const FormItemWarpper = (props) => {
  const { data, config, children, form, showLabel = true, formProps = {} } = props

  useEffect(() => {
    form.resetFields([data.model])
  }, [data.options.minRows])

  useEffect(() => {
    if (/^input$|^textarea$|^number$/g.test(data.type)) {
      form.setFieldsValue({ [data.model]: data.options.defaultValue })
    }
  }, [data.options.defaultValue])

  return <FormItemDragWrap {...props}>
    <Form.Item
      label={showLabel ? data.label : ''}
      labelCol={config.layout === 'horizontal' ? config.labelCol : {}}
      wrapperCol={config.layout === 'horizontal' ? config.wrapperCol : {}}
      name={data.model}
      // initialValue={data.options.defaultValue}
      hidden={data.options.hidden}
      rules={data.rules}
      {...formProps}
    >{children}</Form.Item>
  </FormItemDragWrap>
}

/* 输入框 */
export const InputItem = memo((props) => {
  const { data, config, onChange } = props
  const { placeholder, type, clearable, maxLength, disabled, width, defaultValue } = data.options || {}
  return <FormItemWarpper {...props} >
    <Input
      onChange={onChange}
      style={{ width: width + '%' }}
      placeholder={placeholder}
      type={type}
      value={defaultValue}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
    />
  </FormItemWarpper>
})

/* 数字输入框 */
export const InputNumberItem = memo(props => {
  const { data, config, onChange } = props
  const { width, min, max, step, precision, defaultValue, placeholder } = data.options
  // console.log(precision)
  return <FormItemWarpper {...props} >
    <InputNumber
      style={{ width: width + '%' }}
      onChange={onChange}
      min={min}
      max={max}
      disabled={props.disabled || data.options.disabled}
      step={step}
      value={defaultValue}
      precision={(precision > 50 || (precision && precision !== 0)) ? null : precision}
    />
  </FormItemWarpper>
})

/* 文本框 */
export const TextAreaItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, type, clearable, maxLength, disabled, width, minRows = 1, maxRows = 4 } = data.options || {}
  return <FormItemWarpper {...props} >
    <Input.TextArea
      onChange={onChange}
      style={{ width: width + '%' }}
      value={defaultValue}
      placeholder={placeholder}
      type={type}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
      autoSize={{ minRows, maxRows }}
      rows={minRows}
    />
  </FormItemWarpper>
})

/* 下拉选择器 */
export const SelectItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, width, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Select
      style={{ width: width + '%' }}
      value={defaultValue}
      placeholder={placeholder}
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      filterOption={showSearch ? (inputValue, option) => (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) >= 0
      ) : false}
      disabled={props.disabled || disabled}
      allowClear={clearable}
      mode={multiple ? 'multiple' : ''}
    />
  </FormItemWarpper>
})

/* 多选框 */
export const CheckboxGroupItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Checkbox.Group
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      disabled={props.disabled || disabled}
      value={defaultValue}
      placeholder={placeholder}
    />
  </FormItemWarpper>
})

/* 单选框 */
export const RadioGroupItem = memo((props) => {
  const { data, config, onChange, dynamicData = {} } = props
  const { defaultValue, placeholder, multiple, clearable, showSearch, disabled, dynamic, dynamicKey, options } = data.options || {}

  return <FormItemWarpper {...props}>
    <Radio.Group
      options={dynamic ? (dynamicData[dynamicKey] || []) : options}
      disabled={props.disabled || disabled}
      value={defaultValue}
      placeholder={placeholder}
    />
  </FormItemWarpper>
})


/* 日期选择器 */
export const DatePickerItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, rangePlaceholder, showTime, clearable, format, disabled, range, width } = data.options || {}
  let PickerComponent = DatePicker

  if (range) PickerComponent = RangePicker

  return <FormItemWarpper {...props}>
    <PickerComponent
      style={{ width: width + '%' }}
      showTime={showTime}
      disabled={props.disabled || disabled}
      allowClear={clearable}
      format={format}
      value={defaultValue}
      placeholder={range ? rangePlaceholder : placeholder}
    />
  </FormItemWarpper>
})

/* 时间选择器 */
export const TimePickerItem = memo((props) => {
  const { data, config, onChange } = props
  const { defaultValue, placeholder, rangePlaceholder, showTime, clearable, format, disabled, range, width } = data.options || {}

  return <FormItemWarpper {...props}>
    <TimePicker
      style={{ width: width + '%' }}
      showTime={showTime}
      disabled={props.disabled || disabled}
      allowClear={clearable}
      format={format}
      value={defaultValue}
      placeholder={range ? rangePlaceholder : placeholder}
    />
  </FormItemWarpper>
})

/* 评分 */
export const RateItem = memo((props) => {
  const { data, config } = props
  const { defaultValue, disabled, max, allowHalf, width } = data.options || {}
  return <FormItemWarpper {...props}>
    <Rate
      style={{ width: width + '%' }}
      count={max}
      disabled={props.disabled || disabled}
      allowHalf={allowHalf}
      value={defaultValue}
    />
  </FormItemWarpper>
})

/* 滑动输入条 */
export const SliderItem = memo((props) => {
  const { data, config, form } = props
  const { defaultValue, disabled, min, max, step, allowHalf, showInput, width } = data.options || {}
  // console.log(data)
  const val = form.getFieldValue(data.model)

  const [value, setValue] = useState(val)

  const onChange = (value) => {
    setValue(value)
    form.setFieldsValue({ [data.model]: value })
  }

  return <FormItemWarpper {...props}>
    <div className="slider-box" style={{ width: width + '%' }}>
      <div className="slider">
        <Slider
          count={max}
          disabled={props.disabled || disabled}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </div>
      <div className="number">
        <InputNumber
          style={{ width: '100%' }}
          // onChange={onChange}
          disabled={props.disabled || disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  </FormItemWarpper>
})


/* 文字 */
export const TextItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <label>{data.label}</label>
  </FormItemDragWrap>
})

/* 按钮 */
export const ButtonItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <Button>{data.label}</Button>
  </FormItemDragWrap>
})

/* 开关 */
export const SwitchItem = memo((props) => {
  const { data } = props
  return <FormItemWarpper {...props} formProps={{ valuePropName: 'checked' }}>
    <Switch>{data.label}</Switch>
  </FormItemWarpper>
})

/* HTML */
export const HTMLItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <div dangerouslySetInnerHTML={{ __html: data.options.defaultValue }}></div>
  </FormItemDragWrap>
})

/* 分割线 */
export const DividerItem = memo((props) => {
  const { data, config, onChange } = props
  return <FormItemDragWrap {...props}>
    <Divider orientation={data.options.orientation}>{data.label}</Divider>
  </FormItemDragWrap>
})
