import { Badge } from "react-bootstrap";

export default function ClearButton(props) {
    return (
        <Badge className="clearBadge" bg="secondary" onClick={props.onClick}>
            {props.text}
        </Badge>
    );
}