import React, { useState } from 'react'
import { Table, Divider, Button, Radio, message, Tag, Card, Space, Input } from 'antd';

import axios from 'axios';
import qs from 'qs';
import { SEAT_LIST, SEAT_ADD } from "../../constants/requestURL";

const columns = [
    { title: '火车号', dataIndex: 'trainId', key: 'trainId' },
    { title: '座位号', dataIndex: 'seatId', key: 'seatId' },
    { title: '车厢号', dataIndex: 'carriage', key: 'carriage' },
    { title: '座位数量', dataIndex: 'seatNum', key: 'seatNum' },
    { title: '座位类型', dataIndex: 'seatType', key: 'seatType' },
];

export default function Index() {
    const [trainId, setTrainId] = useState('K324')
    const [carriage, setCarriage] = useState(4)
    const [seatNum, setSeatNum] = useState(1)
    const [seatType, setSeatType] = useState("硬座")
    // const [update, setUpDate] = useState(true)
    const [queryTrainId, setQueryTrainId] = useState('K324')
    const [queryCarriage, setQueryCarriage] = useState(1)
    const [data, setData] = useState([])

    let onChange = (e) => { setSeatType(e.target.value) }

    let addfunction = () => {
        // dispatch(addtrainlist({ trainId, startStation, endStation, startTime, endTime }));
        axios.post(SEAT_ADD, qs.stringify({ trainId, carriage, seatNum, seatType }), {
            headers: {
                'token': window.sessionStorage.getItem('Token'),
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                message.info("添加成功")
                // setUpDate(!update)
            } else {
                message.error('添加失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('添加失败，请求异常');
        })
    };

    let seatlist = () => {
        axios.get(SEAT_LIST, {
            params: { trainId: queryTrainId, carriage: queryCarriage },
            headers: {
                'token': window.sessionStorage.getItem('Token'),
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                // message.info("添加成功")
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

    return (
        <div>
            <div style={{ margin: "10px 0px 20px 20px" }}>
                <Divider orientation="left" style={{ margin: '5px 0px' }} >为列车添加座位</Divider>
                火车号：<Input style={{ width: '15%', margin: '5px 20px 5px 0px' }} defaultValue="" onChange={(e) => setTrainId(e.target.value)} />
                <br />
                车厢ID：<Input style={{ width: '15%', margin: '5px 20px 0px 0px' }} defaultValue="" onChange={(e) => setCarriage(e.target.value)} />
                座位ID：<Input style={{ width: '15%', margin: '5px 20px 0px 0px' }} defaultValue="" onChange={(e) => setSeatNum(e.target.value)} />
                <br />
                座位类型：<Radio.Group onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
                    <Radio.Button value={"硬卧"} >硬卧</Radio.Button>
                    <Radio.Button value={"软卧"} >软卧</Radio.Button>
                    <Radio.Button value={"硬座"} >硬座</Radio.Button>
                    <Radio.Button value={"无座"} >无座</Radio.Button>
                    <Radio.Button value={"一等座"} >一等座</Radio.Button>
                    <Radio.Button value={"二等座"} >二等座</Radio.Button>
                </Radio.Group>
                <br />
                <Button type="primary" onClick={addfunction} style={{ width: '15%', margin: '15px 20px 5px 0px' }}>添加此座位</Button>
                <Divider orientation="left" style={{ margin: '25px 0px' }} >查询列车座位表</Divider>
                火车号：<Input style={{ width: '15%', margin: '5px 20px 5px 0px' }} defaultValue="" onChange={(e) => setQueryTrainId(e.target.value)} />
                <br />
                车厢ID：<Input style={{ width: '15%', margin: '5px 20px 0px 0px' }} defaultValue="" onChange={(e) => setQueryCarriage(e.target.value)} />
                <Button type="primary" onClick={seatlist} style={{ width: '15%', margin: '15px 20px 5px 0px' }}>查询</Button>
                <Card
                    title="搜索结果"
                    bordered={false}
                >
                    <Table
                        tableLayout='fixed'
                        size="small"
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                    />
                </Card>
            </div>

        </div>
    )
}
