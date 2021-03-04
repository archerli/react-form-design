import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { useDrop } from 'react-dnd';
import {
  basicsList,
  // highList,
  layoutList,
  customComponents
} from '../../config/formItemsConfig';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import CollapseItem from './module/CollapseItem'
import FormComponentPanel from './module/FormComponentPanel'
import OperatingArea from './module/OperatingArea'

const { Panel } = Collapse;

const FormDesign = forwardRef((props, ref) => {
  const { fields, toolbars } = props

  useImperativeHandle(ref, () => ({

  }))

  const [basics, setBasics] = useState([])
  const [layout, setLayout] = useState([])
  const [formConfig, useFormConfig] = useState({
    list: [],
    config: {
      layout: "horizontal",
      labelCol: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
      wrapperCol: { xs: 18, sm: 18, md: 18, lg: 18, xl: 18, xxl: 18 },
      hideRequiredMark: false,
      customStyle: ""
    }
  })

  useEffect(() => {
    // 计算需要显示的基础字段
    setBasics(basicsList.filter(item => fields.includes(item.type)))
  }, [basicsList])

  useEffect(() => {
    // 计算需要显示的布局字段
    setLayout(layoutList.filter(item => fields.includes(item.type)))
  }, [layoutList])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="form-designer-container-9136076486841527">

        <div className="content">
          <aside className="left">
            <Collapse
              defaultActiveKey={['1']}
            >
              {!basics.length ? null : <Panel header="基础控件" key="1">
                <CollapseItem
                  list={basics}
                />
              </Panel>}

              {!layout.length ? null : <Panel header="布局控件" key="4">
                <CollapseItem
                  list={layout}
                />
              </Panel>}
            </Collapse>

          </aside>
          <section className="main">
            <OperatingArea />
            <FormComponentPanel data={formConfig} />
          </section>
          <aside className="right">

          </aside>
        </div>
      </div>
    </DndProvider>
  );
})

FormDesign.defaultProps = {
  fields: [
    'input',
    'textarea',
    'number',
    'select',
    'checkbox',
    'radio',
    'date',
    'time',
    'rate',
    'slider',
    'uploadFile',
    'uploadImg',
    'cascader',
    'treeSelect',
    'batch',
    'editor',
    'switch',
    'button',
    'alert',
    'text',
    'html',
    'divider',
    'card',
    'tabs',
    'grid',
    'table'
  ],
  toolbars: [
    'save',
    'preview',
    'importJson',
    'exportJson',
    'exportCode',
    'reset',
    'close'
  ]
}

export default FormDesign;
