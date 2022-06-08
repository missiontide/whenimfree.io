import { Button } from "react-bootstrap";

export default function SubmitButton(props) {
    return (
        <Button
            className="submitButton"
            variant="primary"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
}