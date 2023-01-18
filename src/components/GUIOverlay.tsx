import { Button, Drawer, Space } from "antd";
import { Map } from "leaflet";
import { useState } from "react";
import { StationListData } from "../StationData";
import "./GUIOverlay.css"
import { StationList } from "./StationList";

export const GUIOverlay = ({ mapRef, data }: { mapRef: React.MutableRefObject<Map | null>, data: StationListData }) => {
    const [open, setOpen] = useState(false);

    const [bikeFilter, setBikeFilter] = useState<boolean>(false);
    const [dockFilter, setDockFilter] = useState<boolean>(false);

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
                contentWrapperStyle={{ height: 'calc(40vh)', position: 'absolute' }}
                zIndex={401}
                placement='bottom'
                width={500}
                onClose={onClose}
                open={open}
                closeIcon={null}
                headerStyle={{ display: 'none' }}
            >
                <div className="GUI-overlay">
                    <Button
                        type={bikeFilter ? 'primary' : undefined}
                        onClick={() => { setBikeFilter(!bikeFilter); setDockFilter(false) }}>I have a bike</Button>
                    <Button
                        type={dockFilter ? 'primary' : undefined}
                        onClick={() => { setDockFilter(!dockFilter); setBikeFilter(false) }}>I need a bike</Button>
                </div>
                <div className="list-wrapper">
                    <StationList mapRef={mapRef} data={data} bikeFilter={bikeFilter} dockFilter={dockFilter} />
                </div>
            </Drawer>
        </>
    );
}