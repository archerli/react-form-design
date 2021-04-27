import React, { memo, useState, useRef } from 'react'
import { Row, Col, Card } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem';
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

function CardItem(props) {
    const { data, config, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, onColAd } = props
    const active = data.key && data.key === selectItem.key
    const addEventRef = useRef()

    const setNestedList = (list) => {
        // 新增 与 删除都会执行，新增完了事件对象置空
        if (addEventRef.current) {
            data.list = cloneDeep(list)
            setListOfIndex(index, data)
            let record = data.list[addEventRef.current.newIndex]
            // 从容器中移出元素时，也会执行，此时 item 值为 undfined
            if (record) {
                delete record.icon;
                delete record.component;
                handleSetSelectItem(record)
            }
            addEventRef.current = null
        } else {
            data.list = list
            setListOfIndex(index, data)
        }
    }

    const onDragStart = (evt) => {
        let record = data.list[evt.oldIndex]
        if (record) {
            handleSetSelectItem(record)
        }
    }

    const setChildListOfIndex = (i, d) => {
        data.list[i] = d
        setListOfIndex(index, data)
    }

    const onAdd = (evt) => {
        addEventRef.current = evt
    }

    const onNestedDelete = (itemIndex) => {
        let list = [...data.list]
        list.splice(itemIndex, 1)

        set(data, `list`, list)

        let nextItem = findValidItem(itemIndex, list)
        if (nextItem) {
            handleSetSelectItem({ ...nextItem })
        } else {
            handleSetSelectItem({ ...data })
        }
    }

    return (
        <div className={`grid-box ${active ? 'active' : ''}`} onClick={onSelect}>
            <Card className="grid-row" title={data.label}>
                <div className="grid-col">
                    <div className="draggable-box">
                        <ReactSortable
                            tag="div"
                            className="list-main"
                            list={data.list}
                            setList={setNestedList}
                            group={{ name: 'form-draggable' }}
                            animation={180}
                            ghostClass={'moving'}
                            handle={'.drag-move'}
                            onStart={onDragStart}
                            onAdd={onAdd}
                        >
                            {
                                data.list.map((item, j) => <LayoutItem
                                    key={`${item.key}`}
                                    index={j}
                                    data={item}
                                    form={form}
                                    selectItem={selectItem}
                                    config={config}
                                    hideModel={hideModel}
                                    setListOfIndex={setChildListOfIndex}
                                    handleSetSelectItem={handleSetSelectItem}
                                    onDelete={onNestedDelete}
                                />)
                            }
                        </ReactSortable>
                    </div>
                </div>
            </Card>
            <ActionGroup active={active} {...props} />
        </div>
    )
}

export default memo(CardItem)