import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { Form } from 'antd'
import LayoutItem from './LayoutItem'

function FormComponentPanel(props) {
    const { data, onDrop } = props
    const [form] = Form.useForm()

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'components',
        // hover: (item, monitor) => {
        // },
        drop: (item, monitor) => {
            let data = monitor.getItem().data
            onDrop && onDrop(monitor.getItem().data)
            return data
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDrop: monitor.canDrop(),
        }),
    }), [data]);

    useEffect(() => {
        props.onDropOver && props.onDropOver(isOver)
        // console.log('isOver: ', isOver)
    }, [isOver])

    useEffect(() => {
        // console.log('list:', data.list)
    }, [data])

    return (
        <div className={`form-panel no-toolbars-top`}>
            <p className="hint-text" v-show="data.list.length === 0">
                从左侧选择控件添加
            </p>
            <Form
                className="a-form-box k-form-build"
                form={form}
                layout={data.config.layout}
                hideRequiredMark={data.config.hideRequiredMark}
                style={data.config.customStyle || {}}
            >
                <div ref={drop} className="draggable-box">
                    <div className="list-main">
                        {
                            data.list.map((d, i) => <LayoutItem
                                key={`layout_item_${i}`}
                                index={i}
                                data={d}
                                onItemSort={props.onItemSort}
                            />)
                        }
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default FormComponentPanel;
