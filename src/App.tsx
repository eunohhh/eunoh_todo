import { useState } from "react";
import "./App.css";
import Card from "./components/card";
import { ToDo } from "./d";

const baseToDos = [
    {
        id: 0,
        title: "리액트 공부하기",
        body: "리액트 기초를 공부해 봅시다",
        isDone: false,
    },
    {
        id: 1,
        title: "잠자기",
        body: "잠을 잘 자자",
        isDone: true,
    },
];

function App() {
    const [toDos, setToDos] = useState<ToDo[]>(baseToDos);
    const [todo, setTodo] = useState<ToDo>({
        id: 0,
        title: "",
        body: "",
        isDone: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) setToDos([...toDos, todo]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedTodo: ToDo = {
            ...todo,
            id: toDos.length,
            [e.target.name]: e.target.value,
        };
        setTodo(updatedTodo);
    };

    return (
        <>
            <div className="top_wrapper">
                <header className="my_header">
                    <h3>My Todo List</h3>
                    <p>React</p>
                </header>

                <section className="input_section">
                    <form className="submit_form" onSubmit={handleSubmit}>
                        <div className="input_area">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                name="title"
                                required
                                onChange={handleChange}
                            ></input>
                            <label htmlFor="body">내용</label>
                            <input
                                type="text"
                                name="body"
                                required
                                onChange={handleChange}
                            ></input>
                        </div>

                        <button type="submit">추가하기</button>
                    </form>
                </section>

                <section className="content_section">
                    <div className="content_box">
                        <h2>Working...🔥</h2>
                        <div className="content">
                            {toDos.map((e, i) => {
                                if (!e.isDone) {
                                    return (
                                        <Card
                                            key={i}
                                            todo={e}
                                            toDos={toDos}
                                            input={todo}
                                            setToDos={setToDos}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>

                    <div className="content_box">
                        <h2>Done...🎉</h2>
                        <div className="content">
                            {toDos.map((e, i) => {
                                if (e.isDone) {
                                    return (
                                        <Card
                                            key={i}
                                            todo={e}
                                            toDos={toDos}
                                            input={todo}
                                            setToDos={setToDos}
                                        />
                                    );
                                }
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default App;
