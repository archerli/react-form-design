import React, { memo, useEffect } from 'react';
import IconFont from '../Icon'
import { Form, Button, Switch, Input, Divider, Row, Col } from 'antd'
import GridItem from './GridItem'
import CardItem from './CardItem'
import TabsItem from './TabsItem'
import FormItemDragWrap from './FormItemDragWrap'

export {
  GridItem,
  CardItem,
  TabsItem,
}

const FormItemWarpper = (props) => {
  const { data, config, children, form, showLabel = true, formProps = {} } = props

  useEffect(() => {
    form.resetFields([data.model])
  }, [data.options.minRows])

  useEffect(() => {
    if (/^input$|^textarea$/g.test(data.type)) {
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

export const TextItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <Form.Item>
      <label>{data.label}</label>
    </Form.Item>
  </FormItemDragWrap>
})

export const ButtonItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <Form.Item>
      <Button>{data.label}</Button>
    </Form.Item>
  </FormItemDragWrap>
})


export const SwitchItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <Form.Item>
      <Switch>{data.label}</Switch>
    </Form.Item>
  </FormItemDragWrap>
})

export const HTMLItem = memo((props) => {
  const { data } = props
  return <FormItemDragWrap {...props}>
    <div dangerouslySetInnerHTML={{ __html: data.options.defaultValue }}></div>
  </FormItemDragWrap>
})

export const DividerItem = memo((props) => {
  const { data, config, onChange } = props
  return <FormItemDragWrap {...props}>
    <Divider orientation={data.options.orientation}>{data.label}</Divider>
  </FormItemDragWrap>
})
