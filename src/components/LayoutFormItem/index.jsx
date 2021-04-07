import React, { memo, useEffect } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch, Input, } from 'antd'

const FormItemWarpper = (props) => {
  const { data, config, children, form, ...rest } = props

  useEffect(() => {
    form.resetFields([data.model])
  }, [data.options.defaultValue])

  return <Form.Item
    label={data.label}
    labelCol={config.layout === 'horizontal' ? config.labelCol : {}}
    wrapperCol={config.layout === 'horizontal' ? config.wrapperCol : {}}
    name={data.model}
    initialValue={data.options.defaultValue}
    hidden={data.options.hidden}
    rules={data.rules}
    {...rest}
  >{children}</Form.Item>
}

export const InputItem = memo((props) => {
  const { data, config, onChange } = props
  const { placeholder, type, clearable, maxLength, disabled, width } = data.options || {}
  return <FormItemWarpper data={data} config={config} form={props.form} >
    <Input
      onChange={onChange}
      style={{ width: width + '%' }}
      placeholder={placeholder}
      type={type}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
    />
  </FormItemWarpper>
})

export const TextAreaItem = memo((props) => {
  const { data, config, onChange } = props
  const { placeholder, type, clearable, maxLength, disabled, width, minRows, maxRows } = data.options || {}
  return <FormItemWarpper data={data} config={config} form={props.form}>
    <Input.TextArea
      onChange={onChange}
      style={{ width }}
      placeholder={placeholder}
      type={type}
      allowClear={clearable}
      maxLength={maxLength}
      disabled={disabled}
      autoSize={{ minRows, maxRows }}
      rows={4}

    />
  </FormItemWarpper>
})

export const TextItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <label>{data.label}</label>
  </Form.Item>
})

export const ButtonItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <Button>{data.label}</Button>
  </Form.Item>
})


export const SwitchItem = memo((props) => {
  const { data } = props
  return <Form.Item>
    <Switch>{data.label}</Switch>
  </Form.Item>
})

export const HTMLItem = memo((props) => {
  const { data } = props
  return <div dangerouslySetInnerHTML={{ __html: data.options.defaultValue }}></div>
})