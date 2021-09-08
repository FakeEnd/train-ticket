import React from "react";
import { Button, Card, Col, Layout, Menu, message, Modal, PageHeader, Row, Space, Tag } from "antd";
import { Content } from "antd/es/layout/layout";
import './index.css'
import Text from "antd/es/typography/Text";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import axios from 'axios';
import { ORDER_QUERY } from "../../constants/requestURL";

// 本部分代码由郭常瑞主体完成，我只是稍作修改，得到中端的页面
// 注意到部分代码可能冲突，因为采用的request方法也要修改
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "全部",
            orders: [],
        }
    }

    componentDidMount() {
        this.refreshTickets()
    }

    refreshTickets = () => {
        axios.get(ORDER_QUERY, {
            headers: {
                'token': window.sessionStorage.getItem('Token'),
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                this.setState({ orders: res.data })
                // message.info("添加成功")
            } else {
                message.error('添加失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('添加失败，请求异常');
        })
    }

    handleClick = e => {
        this.setState({ key: e.key });
    };

    filterOrders = () => {
        let k = this.state.key;
        if (k === '全部') {
            return this.state.orders;
        }
        if (k === '已改签') {
            k = '未出行'
        }
        let res = []
        for (let i = 0; i < this.state.orders.length; i++) {
            let order = this.state.orders[i];
            if (k === order.orderStatus)
                res.push(order);
        }
        return res;
    }

    getOrderFromData = (orderId) => {
        for (let i = 0; i < this.state.orders.length; i++) {
            let order = this.state.orders[i];
            if (order.orderId === orderId)
                return order;
        }
    }

    submitOrder = (orderId) => {
        req_post_form('/order/buy', { orderId: orderId },
            (data) => {
                const div = document.createElement('divform');
                div.innerHTML = data.form;
                document.body.appendChild(div);
                document.forms[0].submit();
            })
    }

    getTagColor = (status) => {
        switch (status) {
            case '未出行':
                return 'orange';
            case '待支付':
                return 'red';
            case '已完成':
                return 'green';
            case '已退票':
                return 'purple';
            case '已改签':
                return 'geekblue';
            case '已取消':
                return 'cyan';
            default:
                return 'cyan';
        }
    }

    refundTicket = (orderId) => {
        Modal.confirm({
            title: '确认退票?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                req_post_form('/order/refund', { orderId: orderId },
                    () => {
                        message.info('退票成功')
                        this.refreshTickets()
                    })
            }
        })
    }

    changeTicket = (orderId) => {
        Modal.confirm({
            title: '确认改签?',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                req_post_form('/order/refund', { orderId: orderId },
                    () => {
                        message.info('退票成功')
                        this.refreshTickets()
                    })
            }
        })

    }

    render() {
        return (
            <Content style={{ margin: '0px  0px 20px 0px' }}>
                <Menu className="order-menu" onClick={this.handleClick} selectedKeys={this.state.key}
                    mode="horizontal">
                    <Menu.Item key="全部">
                        全部
                    </Menu.Item>
                    <Menu.Item key="未出行">
                        未出行
                    </Menu.Item>
                    <Menu.Item key="待支付">
                        待支付
                    </Menu.Item>
                    <Menu.Item key="已完成">
                        已完成
                    </Menu.Item>
                    <Menu.Item key="已退票">
                        已退票
                    </Menu.Item>
                    <Menu.Item key="已取消">
                        已取消
                    </Menu.Item>
                </Menu>
                <Row gutter={[25, 25]} style={{ margin: 'auto 200px' }}>
                    {
                        this.filterOrders().map(
                            (t) => (
                                <Col span={6}>
                                    <Card className="order-manager-card" hoverable>
                                        <Space direction="vertical">
                                            <Space>
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t.ticket.startStation}</Text>
                                                <Text> {'->'} </Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{t.ticket.endStation}</Text>
                                                <Tag color={this.getTagColor(t.orderStatus)} style={{ marginLeft: 15 }}>{t.orderStatus}</Tag>
                                            </Space>
                                            <Space size={0}>
                                                <Tag>始</Tag>
                                                <Text style={{ fontSize: 14 }}>{t.ticket.startTime.substr(5, 11)}</Text>
                                            </Space>
                                            <Space size={0}>
                                                <Tag>终</Tag>
                                                <Text style={{ fontSize: 14 }}>{t.ticket.endTime.substr(5, 11)}</Text>
                                            </Space>
                                            <Space>
                                                <Tag>座位</Tag>
                                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t.seat.trainId}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{t.seat.carriage}厢</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{t.seat.seatNum}号</Text>
                                            </Space>
                                            <Space>
                                                <Tag>座位类型</Tag>
                                                <Text style={{ fontWeight: 'bold' }}>{t.ticket.ticketType}</Text>
                                            </Space>
                                            <Space>
                                                <Tag>订单时间</Tag>
                                                <Text style={{ fontSize: 14 }}>{t.buyTime.substr(5, 14)}</Text>
                                            </Space>
                                            <Space style={{ margin: '0 0 0 100px' }}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>合计: </Text>
                                                <Text style={{ fontWeight: 'bold', fontSize: 18, color: "red" }}>￥{t.ticket.ticketPrice}</Text>
                                            </Space>
                                            <Space>
                                                {/* <Button style={{ background: '#F0F5FF' }}
                                                        onClick={() => this.submitOrder(t.orderId)}>支付</Button>
                                                    <Button onClick={() => this.refundTicket(t.orderId)}
                                                        style={{ background: '#F0F5FF' }}>退票</Button>
                                                    <Button style={{ background: '#F0F5FF' }}>改签</Button> */}
                                            </Space>
                                        </Space>
                                    </Card>
                                </Col>
                            )
                        )
                    }
                </Row>
            </Content>

        )
    }
}