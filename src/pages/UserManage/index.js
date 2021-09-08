import React, { useEffect, useState } from 'react'
import { Table, Divider, Button, Radio, message, Tag, Modal, Space } from 'antd';

import axios from 'axios';
import qs from 'qs';
import { USER_ROLE, USER_LIST } from "../../constants/requestURL";

const ButtonGroup = Button.Group

export default function Index() {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState();
    const [roleId, setRoleId] = useState();
    const [update, setUpDate] = useState(true)
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    let userlist = () => {
        axios.get(USER_LIST, {
            headers: {
                'token': window.sessionStorage.getItem('Token'),
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                let newlist = res.data.map((item, index) => {
                    return {
                        ...item,
                        key: index
                    }
                })
                setData(newlist)
            } else {
                message.error('查询失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('查询失败，请求异常');
        })
    };

    let changeUserRole = () => {
        axios.post(USER_ROLE, qs.stringify({ roleId, userId }), {
            headers: {
                'token': window.sessionStorage.getItem('Token')
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                message.info("修改成功")
                setUpDate(!update)
                setIsShowEditModal(!isShowEditModal)
            } else {
                message.error('修改失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('修改失败，请求异常');
        })
    };

    let editRole = (record) => {
        console.log(record)
        setIsShowEditModal(!isShowEditModal)
        setUserId(record.userId)
        setRoleId(record.roles[0].roleId)
    }

    let hideEditModal = () => {
        setIsShowEditModal(!isShowEditModal)
    }

    const columns = [
        { title: '用户Id', dataIndex: 'userId', key: 'userId' },
        { title: '用户名', dataIndex: 'userName', key: 'userName' },
        { title: '登录时间', dataIndex: 'loginDate', key: 'loginDate' },
        {
            title: '角色',
            key: 'roles',
            dataIndex: 'roles',
            render: tags => (
                <span>
                    {tags.map((tag, index) => {
                        let color = tag.roleId > 3 ? 'geekblue' : 'green';
                        if (tag.roleId === 2) {
                            color = 'red'
                        }
                        return (
                            <Tag color={color} key={index}>
                                {tag.roleName}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return (
                    <ButtonGroup>
                        <Button size="small" type="primary" onClick={editRole.bind(this, record)} >编辑</Button>
                    </ButtonGroup>
                )
            }
        }
    ];

    useEffect(() => {
        userlist()
    }, [update])

    let onChange = (e) => {
        // console.log(`radio checked:${e.target.value}`);
        setRoleId(e.target.value)
    }
    return (
        <div>
            <div style={{ margin: "10px 0px 20px 20px" }}>
                <Divider orientation="left" style={{ margin: '5px 0px' }} >用户角色查询和修改</Divider>
            </div>

            <Table
                style={{ margin: "10px 0px 10px 20px" }}
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <Modal
                title={"更新角色属性"}
                visible={isShowEditModal}
                onCancel={hideEditModal}
                onOk={changeUserRole}
                okText='确认更新'
                cancelText='取消'
            >
                <Divider orientation="left" style={{ margin: '5px 0px' }} >选择将要更改的角色属性</Divider>
                <Radio.Group onChange={onChange} value={roleId} style={{ marginTop: 16 }}>
                    <Space direction="vertical">
                        <Radio value={2} >管理员</Radio>
                        <Radio value={3} >普通用户</Radio>
                        <Radio value={4} >火车管理员(负责车次、座位)</Radio>
                        <Radio value={5} >销售管理员(负责订单管理)</Radio>
                    </Space>
                </Radio.Group>

            </Modal>
        </div>
    )
}




