import { Button } from "react-bootstrap";

export default function ClearButton(props) {
    return (
        <Button size="sm" variant="secondary" onClick={props.onClick}>
            {props.text}
        </Button>
    );
}