import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { Form } from 'antd'
import LayoutItem from './LayoutItem'

function FormComponentPanel(props) {
    const { data, onDrop } = props
    const [form] = Form.useForm()

    useEffect(() => {
        // console.log('list:', data.list)
    }, [data])


    return (
        <div className={`form-panel no-toolbars-top`}>
            {data.list.length ? null : <p className="hint-text" >
                从左侧选择控件添加
            </p>}
            <Form
                className="a-form-box k-form-build"
                form={form}
                layout={data.config.layout}
                hideRequiredMark={data.config.hideRequiredMark}
                style={data.config.customStyle || {}}
            >
                <div className="draggable-box">
                    {data.list.map((item, index) => <LayoutItem
                        key={`layout_${index}`}
                        index={index}
                        data={item}
                    // onItemSort={props.onItemSort}
                    />)}
                </div>
            </Form>
        </div>
    )
}

export default FormComponentPanel;
