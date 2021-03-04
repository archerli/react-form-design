import React from 'react'
import { Tooltip } from 'antd'
import { SaveOutlined, ChromeOutlined, ImportOutlined, CreditCardOutlined, CodeOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'

function OperatingArea(props) {
    const { toolbars } = props
    const iconStyle = { fontSize: 16 }
    return (
        <div className="operating-area">
            <div className="left-btn-box">
                {toolbars.includes('save') ? <Tooltip title="保存" >
                    <a onClick={props.onSave}>
                        <SaveOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}

                {toolbars.includes('preview') ? <Tooltip title="预览" >
                    <a onClick={props.onSave}>
                        <ChromeOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}

                {toolbars.includes('importJson') ? <Tooltip title="导入" >
                    <a onClick={props.onSave}>
                        <ImportOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}

                {toolbars.includes('exportJson') ? <Tooltip title="生成JSON" >
                    <a onClick={props.onSave}>
                        <CreditCardOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}

                {toolbars.includes('exportCode') ? <Tooltip title="生成代码" >
                    <a onClick={props.onSave}>
                        <CodeOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}

                {toolbars.includes('reset') ? <Tooltip title="清空" >
                    <a onClick={props.onSave}>
                        <DeleteOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}


            </div>
            <div className="right-btn-box">
                {toolbars.includes('close') ? <Tooltip title="关闭" >
                    <a onClick={props.onSave}>
                        <CloseOutlined style={iconStyle} />
                    </a>
                </Tooltip> : null}
            </div>
        </div>
    );
}

OperatingArea.defaultProps = {
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
export default OperatingArea;
