import React, { useEffect, useState } from 'react'
import { Table, Input, Divider, Button, TimePicker, message } from 'antd';
import { gettrainlist } from './trainmanage_redux';
import { useDispatch, useSelector } from 'react-redux';
import ProgressComponent from '../../components/ProgressComponent';

import axios from 'axios';
import qs from 'qs';
import { TRAIN_ADD, TRAIN_DELETE } from "../../constants/requestURL";

const columns = [
    { title: '火车号', dataIndex: 'trainId', key: 'trainId' },
    { title: '始发站', dataIndex: 'startStation', key: 'startStation' },
    { title: '终点站', dataIndex: 'endStation', key: 'endStation' },
    { title: '出发时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '到达时间', dataIndex: 'endTime', key: 'endTime' },
    // { title: '经过时间', dataIndex: 'acrossDays', key: 'acrossDays' },
    // { title: '到站信息', dataIndex: 'stationInfo', key: 'stationInfo' },
    // { title: '座位信息', dataIndex: 'seatInfo', key: 'seatInfo' },
];

const stationInfo = "[{\"acrossDays\":0,\"station\":\"深圳\",\"time\":\"07:00\"},{\"acrossDays\":1,\"station\":\"哈尔滨\",\"time\":\"22:30\"}]"
const seatInfo = "[{\"num\":10,\"type\":\"硬座\"},{\"num\":5,\"type\":\"硬卧\"}]"

export default function Index() {
    const [trainId, setTrainId] = useState("K111");//train id
    const [startStation, setStartStation] = useState("南京");
    const [endStation, setEndStation] = useState("上海");
    const [startTime, setStartTime] = useState("02:00:00");
    const [endTime, setEndTime] = useState("04:00:00");
    const [update, setUpDate] = useState(true)

    const dispatch = useDispatch();
    const data = useSelector(state => state.trainmanage.data)

    let addfunction = () => {
        // dispatch(addtrainlist({ trainId, startStation, endStation, startTime, endTime }));
        axios.post(TRAIN_ADD, ({ trainId, startStation, endStation, startTime, endTime, acrossDays: 1, stationInfo, seatInfo }), {
            headers: {
                'token': window.sessionStorage.getItem('Token'),
                'Content-Type': 'application/json'
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                message.info("添加成功")
                setUpDate(!update)
            } else {
                message.error('添加失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('添加失败，请求异常');
        })
    };

    let deletefunction = () => {
        axios.post(TRAIN_DELETE, qs.stringify({ trainId }), {
            headers: {
                'token': window.sessionStorage.getItem('Token')
            }
        }).then(
            res => res.data
        ).then(res => {
            if (res.code === 0) {
                message.info("修改成功")
                setUpDate(!update)
            } else {
                message.error('修改失败：' + res.message)
            }
        }).catch(err => {
            console.error(err);
            message.error('修改失败，请求异常');
        })
    };

    useEffect(() => {
        dispatch(gettrainlist())
    }, [dispatch, update])


    return (
        <div>
            <div style={{ margin: "10px 0px 20px 20px" }}>
                <Divider orientation="left" style={{ margin: '5px 0px' }} >填写表格进行删改</Divider>

                火车号：<Input style={{ width: '15%', margin: '5px 0px' }} defaultValue="" onChange={(e) => { setTrainId(e.target.value) }} />
                <br />
                始发站：<Input style={{ width: '15%', margin: '5px 20px 5px 0px' }} defaultValue="" onChange={(e) => setStartStation(e.target.value)} />
                终点站：<Input style={{ width: '15%', margin: '5px 0px' }} defaultValue="" onChange={(e) => setEndStation(e.target.value)} />
                <br />
                {/* 时间：<TimePicker.RangePicker style={{ width: '30%', margin: '5px 0px' }} onChange={(value) => {console.log(value[0]['_d'].getHours())}} format="HH:mm:ss"/> */}
                时间：<TimePicker.RangePicker style={{ width: '30%', margin: '5px 0px' }} onChange={(value) => { setStartTime(value[0]['_d'].toTimeString().split(" ")[0]); setEndTime(value[1]['_d'].toTimeString().split(" ")[0]) }} format="HH:mm:ss" />
                <br />
                <Button type="primary" onClick={addfunction} style={{ width: '15%', margin: '5px 20px 5px 0px' }}>添加此列车</Button>
                <Button danger onClick={deletefunction} style={{ width: '15%', margin: '5px 20px 5px 0px' }}>删除此列车</Button>

            </div>

            <Table
                style={{ margin: "10px 0px 10px 20px" }}
                columns={columns}
                expandable={{
                    expandedRowRender: record => < ProgressComponent data={record.stationInfo} />,
                }}
                dataSource={data}
                pagination={false}
            />
        </div>
    )
}



