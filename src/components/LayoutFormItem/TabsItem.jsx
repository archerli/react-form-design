import React, { memo, useState, useRef } from 'react'
import { Row, Col, Card } from 'antd'
import { ReactSortable } from "react-sortablejs";
import LayoutItem from '../FormDesign/module/LayoutItem';
import { ActionGroup } from './FormItemDragWrap'
import { cloneDeep, get, set } from 'lodash';
import { findValidItem } from '../../utils'

function TabsItem() {
  return (
    <div>
      TabItem
    </div>
  );
}

export default TabsItem;
