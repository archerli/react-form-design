import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from './LayoutItem'


function FormComponentPanel(props) {
    const { data, setList, selectItem, hideModel, handleSetSelectItem, onAdd, onColAdd } = props
    const [form] = Form.useForm()

    useEffect(() => {
        // console.log('list:', data.list)
    }, [data])

    const onDragStart = (evt) => {
        let record = data.list[evt.oldIndex]
        if (record) {
            handleSetSelectItem && handleSetSelectItem(record)
        }
    }

    const onDelete = (index) => {
        let nextIndex = index - 1
        if (nextIndex < 0) nextIndex = index + 1
        if (nextIndex > data.list.length - 1) nextIndex = data.list.length - 1
        let nextItem = data.list[nextIndex]
        data.list.splice(index, 1)
        setList([...data.list])
        if (data.list.length) handleSetSelectItem({ ...nextItem })
    }

    const setListOfIndex = (index, d) => {
        data.list[index] = d
        setList && setList(data.list)
    }

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
                    <ReactSortable
                        tag="div"
                        className="list-main"
                        list={data.list}
                        setList={setList}
                        group={{ name: 'form-draggable' }}
                        animation={180}
                        ghostClass={'moving'}
                        handle={'.drag-move'}
                        onStart={onDragStart}
                        onAdd={onAdd}
                    >
                        {data.list.map((item, index) => {
                            return <LayoutItem
                                key={item.key}
                                index={index}
                                data={item}
                                form={form}
                                selectItem={selectItem}
                                config={data.config}
                                hideModel={hideModel}
                                handleSetSelectItem={handleSetSelectItem}
                                setListOfIndex={setListOfIndex}
                                onDelete={onDelete}
                                onColAdd={onColAdd}
                            />
                        })}
                    </ReactSortable>
                </div>
            </Form>

        </div>
    )
}



export default FormComponentPanel;
