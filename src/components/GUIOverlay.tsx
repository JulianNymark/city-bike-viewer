import { Button, Drawer, Space } from "antd";
import { Map } from "leaflet";
import { useState } from "react";
import { StationListData } from "../StationData";
import "./GUIOverlay.css"
import { StationList } from "./StationList";

export const GUIOverlay = ({mapRef, data}: {mapRef: React.MutableRefObject<Map|null>, data: StationListData}) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="drawer-button-container">
                <Button className="drawer-button" onClick={showDrawer}>Filtering</Button>
            </div>
            <Drawer
                contentWrapperStyle={{height: 'fit-content'}}
                zIndex={401}
                title="Filtering"
                placement='bottom'
                width={500}
                onClose={onClose}
                open={open}
            >
                <div className="GUI-overlay">
                    <Button>I have a bike</Button>
                    <Button>I need a bike</Button>
                </div>
                <StationList mapRef={mapRef} data={data}/>
            </Drawer>
        </>
    );
}