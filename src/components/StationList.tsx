import React, { MouseEvent, MouseEventHandler } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StationData, StationListData } from '../StationData';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { Map } from 'leaflet';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<StationData> = [
    {
        title: 'Station',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Bikes Avail.',
        dataIndex: 'bikesAvailable',
        key: 'bikesAvailable',
        sorter: (a, b) => a.bikesAvailable - b.bikesAvailable,
    },
    {
        title: 'Docks Avail.',
        dataIndex: 'docksAvailable',
        key: 'docksAvailable',
        sorter: (a, b) => a.docksAvailable - b.docksAvailable,
    },
];

export const StationList = ({ mapRef, data }: { mapRef: React.MutableRefObject<Map | null>, data: StationListData }) => {
    return (
        <Table
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event: MouseEvent<HTMLElement>) => {
                        const station_id = event.currentTarget.dataset.rowKey;
                        const station_data = data.find((station) => station.id == station_id);
                        if (station_data?.lat && station_data.lon) {
                            mapRef.current?.panTo({ lat: station_data.lat, lng: station_data?.lon }, {animate: true});
                        }
                    },
                }
            }}
            columns={columns}
            dataSource={data}
            scroll={{ y: 180 }}
            rowKey={(record) => record.id}
            pagination={false}
        />)
};