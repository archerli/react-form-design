import React, { memo, useState, useRef, forwardRef } from 'react';
import { Row, Col } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem'
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

const GridItem = memo((props) => {
    const { data, config, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, isEdit = true } = props
    const active = data.key && data.key === (selectItem && selectItem.key)
    const setColumnsList = (d, list) => {
        console.log(list)
    }

    const setNestedList = (d, i, list) => {
        // console.log(list)
        data.columns[i].list = cloneDeep(list)
        setListOfIndex(index, data)
    }

    const setChildNestedList = (i, d) => {
        // console.log(i, d)
        for (let col of data.columns) {
            col.list = col.list.map((item) => {
                if (item.key === d.key) return { ...d }
                return item
            })
        }
        setListOfIndex(index, data)
        // console.log(index, data)
    }

    const onAdd = (i, evt) => {
        setTimeout(() => {
            let record = data.columns[i].list[evt.newIndex]
            // 从容器中移出元素时，也会执行，此时 item 值为 undefined
            if (record) {
                delete record.icon;
                delete record.component;
                set(data, `columns[${i}].list[${evt.newIndex}]`, record)
                handleSetSelectItem(record)
            }
        }, 0)
    }

    const onDragStart = (i, evt) => {
        let record = data.columns[i].list[evt.oldIndex]
        if (record) {
            handleSetSelectItem(record)
        }
    }

    const onGridDelete = (colIndex, itemIndex, item) => {
        let list = get(data.columns, `[${colIndex}].list`, [])

        list.splice(itemIndex, 1)

        set(data.columns, `[${colIndex}].list`, list)
        // setListOfIndex(index, data)

        let nextItem = findValidItem(itemIndex, list)
        if (nextItem) {
            handleSetSelectItem({ ...nextItem })
        } else {
            handleSetSelectItem({ ...data })
        }
    }

    return <div className={`grid-box ${active ? 'active' : ''}`} onClick={onSelect}>
        {/* <ReactSortable
            tag={'div'}
            className="list-main"
            list={data.columns}
            setList={(list) => setColumnsList(data, list)}
            group={{ name: 'form-draggable' }}
            animation={180}
            ghostClass={'moving'}
            handle={'.drag-move'}
            onStart={(evt) => onDragStart(evt)}
            onAdd={(evt) => onAdd(evt)}
        > */}
        <Row className="grid-row" gutter={data.options.gutter} >
            {data.columns.map((d, i) => {
                return <Col className="grid-col" key={`grid_col_${i}`} span={d.span || 0}>
                    <Col className="grid-col" span={24}>
                        <div className="draggable-box">
                            <SortWrap
                                data={d}
                                index={i}
                                setNestedList={setNestedList}
                                onDragStart={onDragStart}
                                onAdd={onAdd}
                                isEdit={isEdit}
                            >
                                {d.list.map((item, j) => <LayoutItem
                                    key={`${item.key}`}
                                    index={j}
                                    data={item}
                                    form={form}
                                    selectItem={selectItem}
                                    config={config}
                                    hideModel={hideModel}
                                    setListOfIndex={setChildNestedList}
                                    handleSetSelectItem={handleSetSelectItem}
                                    onDelete={(itemIndex) => onGridDelete(i, itemIndex)}
                                    isEdit={isEdit}
                                />)}
                            </SortWrap>
                        </div>
                    </Col>
                </Col>
            })}
        </Row>

        {/* </ReactSortable> */}

        {!isEdit ? null : <ActionGroup active={active} {...props} />}

    </div>
})

const SortWrap = (props) => {
    const { data, index, setNestedList, onDragStart, onAdd, isEdit = true } = props

    if (!isEdit) return props.children

    return <ReactSortable
        tag="div"
        className="list-main"
        list={data.list}
        setList={(list) => setNestedList(data, index, list)}
        group={{ name: 'form-draggable' }}
        animation={180}
        ghostClass={'moving'}
        handle={'.drag-move'}
        onStart={(evt) => onDragStart(index, evt)}
        onAdd={(evt) => onAdd(index, evt)}
    >
        {props.children}
    </ReactSortable>
}

export default GridItem;
