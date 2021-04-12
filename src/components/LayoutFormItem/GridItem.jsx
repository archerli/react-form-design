import React, { memo, useState, useRef } from 'react';
import { Row, Col } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem'
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidIndex } from '../../utils'

const GridItem = memo((props) => {
    const { data, form, index, selectItem, onSelect, hideModel, onDelete, handleSetSelectItem, setListOfIndex, onColAdd } = props
    const active = data.key && data.key === selectItem.key

    const setGridList = (d, i, list) => {
        d.list = list
        data.columns[i] = { ...d }
        setListOfIndex(index, cloneDeep(data))
    }

    const onAdd = (i, evt) => {
        setTimeout(() => {
            let item = data.columns[i].list[evt.newIndex]
            if (item) handleSetSelectItem(item)
        }, 0)
    }

    const onGridDelete = (colIndex, itemIndex, item) => {
        let list = get(data.columns, `[${colIndex}].list`, [])

        list.splice(itemIndex, 1)

        set(data.columns, `[${colIndex}].list`, list)
        setListOfIndex(index, cloneDeep(data))

        let nextItem = findValidIndex(itemIndex, list)
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
                                {d.list.map((item, index) => <LayoutItem
                                    key={`${item.key}`}
                                    index={index}
                                    data={item}
                                    form={form}
                                    selectItem={selectItem}
                                    config={data.config}
                                    hideModel={hideModel}
                                    handleSetSelectItem={handleSetSelectItem}
                                    onDelete={(itemIndex, data) => onGridDelete(i, itemIndex, data)}
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
