import React, { memo, useState, useRef } from 'react';
import { Row, Col } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem'
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

const GridItem = memo((props) => {
    const { data, config, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, onColAd } = props
    const active = data.key && data.key === selectItem.key

    const setGridList = (d, i, list) => {
        // console.log(data, list)
        data.columns[i].list = cloneDeep(list)
        if (setListOfIndex) setListOfIndex(index, cloneDeep(data))
    }

    const setColListOfIndex = (index, data) => {
        // console.log(index, data)
    }

    const onAdd = (i, evt) => {
        setTimeout(() => {
            data.columns[i].list = cloneDeep(data.columns[i].list)
            let item = data.columns[i].list[evt.newIndex]
            if (item) handleSetSelectItem(item)
        }, 0)
    }

    const onGridDelete = (colIndex, itemIndex, item) => {
        let list = get(data.columns, `[${colIndex}].list`, [])

        list.splice(itemIndex, 1)

        set(data.columns, `[${colIndex}].list`, list)
        if (setListOfIndex) setListOfIndex(index, cloneDeep(data))

        let nextItem = findValidItem(itemIndex, list)
        if (nextItem) {
            handleSetSelectItem({ ...nextItem })
        } else {
            handleSetSelectItem({ ...data })
        }
    }

    return <div className={`grid-box ${active ? 'active' : ''}`} onClick={onSelect}>
        <Row className="grid-row" gutter={data.options.gutter} >
            {data.columns.map((d, i) => {
                return <Col className="grid-col" key={`grid_col_${i}`} span={d.span || 0}>
                    <Col className="grid-col" span={24}>
                        <div className="draggable-box">
                            <ReactSortable
                                tag="div"
                                className="list-main"
                                list={d.list}
                                setList={(list) => setGridList(d, i, list)}
                                group={{ name: 'form-draggable' }}
                                animation={180}
                                ghostClass={'moving'}
                                handle={'.drag-move'}
                                onAdd={(evt) => onAdd(i, evt)}
                            >
                                {d.list.map((item, j) => <LayoutItem
                                    key={`${item.key}`}
                                    index={j}
                                    data={item}
                                    form={form}
                                    selectItem={selectItem}
                                    config={config}
                                    hideModel={hideModel}
                                    handleSetSelectItem={handleSetSelectItem}
                                    onDelete={(itemIndex) => onGridDelete(i, itemIndex)}
                                />)}
                            </ReactSortable>
                        </div>
                    </Col>
                </Col>
            })}
        </Row>

        <ActionGroup active={active} onDelete={onDelete} />
    </div>
})


export default GridItem;
