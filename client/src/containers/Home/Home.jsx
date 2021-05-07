import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Time from "../../components/Time/Time";
import { createTask, readTasks } from "../../actions/taskAction";
import { Button, Col, Container, Form, NavLink, Row } from "react-bootstrap";
import Task from "../../components/Task/Task";
import Input from "../../components/Forms/Input";
import { Redirect } from "react-router";

const Home = () => {
    const [name, setTaskName] = useState('');
    const [error, setError] = useState('');

    const task = useSelector(state => state.task);
    const dispatch = useDispatch();

    const postTask = (e) => {
        e.preventDefault();
        const task = {
            name
        }

        dispatch(createTask(task));
    }

    useEffect(() => {
        dispatch(readTasks());
    }, []);

    if (task.posted) {
        window.location.reload();
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));

    return (
        <>
            <Time />
            <Container fluid>
                <Row style={{ marginTop: "50px" }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center">Add a Task!</h1>
                        <Form onSubmit={postTask}>
                            <Input
                                label="Task:"
                                placeholder="Enter Task"
                                value={name}
                                type="text"
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            <Button type="submit" className="btn mt-3">
                                Add!
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {tasks != null && tasks.length > 0 ? tasks.map((task) =>
            (
                <div key={task._id} >
                    <Task id={task._id} name={task.name} />
                    <Container>
                        <hr />
                    </Container>
                </div>
            )) : null}
        </>
    );
}

export default Home;