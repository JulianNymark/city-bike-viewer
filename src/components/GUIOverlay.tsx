import { Button } from "antd";
import "./GUIOverlay.css"

export const GUIOverlay = () => {
    return (
        <div className="GUI-overlay">
            <Button>I have a bike</Button>
            <Button>I need a bike</Button>
        </div>
    );
}