import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { ToDo } from "../../d";
import { AppDispatch, RootState } from "../../store/store";
import {
    addToDo,
    deleteToDo,
    fetchToDos,
    toggleIsDone,
} from "../../store/todoSlice";
import CardList from "../CardList";
import Form from "../Form";

function ToDoContainer() {
    const dispatch: AppDispatch = useDispatch();
    const { toDos, loading, error } = useSelector(
        (state: RootState) => state.toDos
    );

    useEffect(() => {
        dispatch(fetchToDos());
    }, [dispatch]);

    const handleAddToDo = (newTodo: ToDo) => {
        dispatch(addToDo(newTodo));
    };

    const handleDeleteToDO = (toDoId: string) => {
        dispatch(deleteToDo(toDoId));
    };

    const handleToggleIsDone = (toDoId: string) => {
        dispatch(toggleIsDone(toDoId));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const workingToDos: ToDo[] = toDos.filter((todo: ToDo) => !todo.isDone);
    const doneToDos: ToDo[] = toDos.filter((todo: ToDo) => todo.isDone);

    console.log(toDos);

    return (
        <>
            <div className="top_wrapper">
                <header className="my_header">
                    <h3>My Todo List</h3>
                    <p>React</p>
                </header>

                <Form addToDo={handleAddToDo} />

                <section className="content_section">
                    <CardList
                        title={"Working...🔥"}
                        toDos={workingToDos}
                        deleteToDo={handleDeleteToDO}
                        toggleIsDone={handleToggleIsDone}
                    />
                    <CardList
                        title={"Done...🎉"}
                        toDos={doneToDos}
                        deleteToDo={handleDeleteToDO}
                        toggleIsDone={handleToggleIsDone}
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
