import { Col, Container, Row, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import { deleteTaskAction } from "../../actions/taskAction";

const Task = (props) => {
    const dispatch = useDispatch();

    const deleteTask = (e) => {
        e.preventDefault();
        const delConfirm = window.confirm("Are you sure that you want to delete it?");
        if (delConfirm) {
            const id = props.id;
            dispatch(deleteTaskAction(id));
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="text-center pt-5">
                        <h5 className="heading text-center">{props.name}</h5>
                    </Col>
                    <Col className="pt-5">
                        <Button className="pr-1" style={{fontSize: "0.75rem"}} onClick={deleteTask}>Delete</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Task;