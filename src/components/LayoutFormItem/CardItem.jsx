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

    const setNestedList = (list) => {
        data.list = cloneDeep(list)
        setListOfIndex(index, data)
    }

    const setChildNestedList = (i, d) => {
        data.list[i] = d
        setListOfIndex(index, data)
    }

    const onAdd = (evt) => {
        setTimeout(() => {
            data.list = cloneDeep(data.list)
            let item = data.list[evt.newIndex]
            console.log(item)
            if (item) handleSetSelectItem(item)
        }, 0)
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
                                    setListOfIndex={setChildNestedList}
                                    handleSetSelectItem={handleSetSelectItem}
                                    onDelete={onNestedDelete}
                                />)
                            }
                        </ReactSortable>
                    </div>
                </div>
            </Card>
            <ActionGroup active={active} onDelete={onDelete} />
        </div>
    )
}

export default memo(CardItem)