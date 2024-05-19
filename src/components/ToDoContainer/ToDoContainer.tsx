import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import { ToDo } from "../../d";
import CardList from "../CardList";
import Form from "../Form";

function ToDoContainer() {
    // 모든 투두 객체들을 포함할 배열
    const [toDos, setToDos] = useState<ToDo[] | null>(null);

    const fetchToDos = async () => {
        const { data } = await axios.get("http://localhost:3001/todos");
        setToDos(data);
    };

    const addToDo = (newTodo: ToDo) =>
        setToDos((prevToDos) => prevToDos && [...prevToDos, newTodo]);

    const deleteToDo = (toDoId: string) =>
        setToDos(
            (prevToDos) =>
                prevToDos && prevToDos.filter((todo) => todo.id !== toDoId)
        );

    const toggleIsDone = (toDoId: string) =>
        setToDos(
            (prevToDos) =>
                prevToDos &&
                prevToDos.map((todo) =>
                    todo.id === toDoId
                        ? { ...todo, isDone: !todo.isDone }
                        : todo
                )
        );

    useEffect(() => {
        fetchToDos();
    }, []);

    const workingToDos: ToDo[] = (toDos || []).filter((todo) => !todo.isDone);
    const doneToDos: ToDo[] = (toDos || []).filter((todo) => todo.isDone);

    console.log(toDos);

    return (
        <>
            <div className="top_wrapper">
                <header className="my_header">
                    <h3>My Todo List</h3>
                    <p>React</p>
                </header>

                <Form addToDo={addToDo} />

                <section className="content_section">
                    <CardList
                        title={"Working...🔥"}
                        toDos={workingToDos}
                        deleteToDo={deleteToDo}
                        toggleIsDone={toggleIsDone}
                    />
                    <CardList
                        title={"Done...🎉"}
                        toDos={doneToDos}
                        deleteToDo={deleteToDo}
                        toggleIsDone={toggleIsDone}
                    />
                </section>
            </div>
        </>
    );
}

export default ToDoContainer;

// const baseToDos = [
//     {
//         id: uuidv4(),
//         title: "리액트 공부하기",
//         body: "리액트 기초를 공부해 봅시다",
//         isDone: false,
//     },
//     {
//         id: uuidv4(),
//         title: "잠자기",
//         body: "잠을 잘 자자",
//         isDone: true,
//     },
// ];
