import { Button } from "react-bootstrap";

export default function SubmitButton(props) {
    return (
        <Button variant="primary" onClick={props.onClick}>
            Create Scheduler
        </Button>
    );
}