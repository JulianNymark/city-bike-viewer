import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { StationData, StationListData } from '../StationData';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { Map } from 'leaflet';
import { FilterValue } from 'antd/es/table/interface';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

type filterChoices = 'bikes' | 'docks';
type filterSetting = {
    columnKey?: filterChoices,
    value?: number,
}

export const StationList = ({ mapRef, data, bikeFilter, dockFilter }:
    {
        mapRef: React.MutableRefObject<Map | null>,
        data: StationListData,
        bikeFilter: boolean,
        dockFilter: boolean
    }) => {

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
            defaultFilteredValue: [false],
            onFilter: (value, record) => {
                if (bikeFilter) {
                    return record.docksAvailable > 0 ? true : false;
                }
                return true;
            },
        },
        {
            title: 'Docks Avail.',
            dataIndex: 'docksAvailable',
            key: 'docksAvailable',
            sorter: (a, b) => a.docksAvailable - b.docksAvailable,
            defaultFilteredValue: [false],
            onFilter: (value, record) => {
                if (dockFilter) {
                    return record.bikesAvailable > 0 ? true : false;
                }
                return true;
            },
        },
    ];

    return (
        <Table
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event: MouseEvent<HTMLElement>) => {
                        const station_id = event.currentTarget.dataset.rowKey;
                        const station_data = data.find((station) => station.id == station_id);
                        if (station_data?.lat && station_data.lon) {
                            mapRef.current?.panTo({ lat: station_data.lat, lng: station_data?.lon }, { animate: true });
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