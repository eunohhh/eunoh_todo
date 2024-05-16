import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Card from "./components/Card/Card";
import Form from "./components/Form/Form";
import { ToDo } from "./d";

const baseToDos = [
    {
        id: uuidv4(),
        title: "리액트 공부하기",
        body: "리액트 기초를 공부해 봅시다",
        isDone: false,
    },
    {
        id: uuidv4(),
        title: "잠자기",
        body: "잠을 잘 자자",
        isDone: true,
    },
];

function App() {
    // 모든 투두 객체들을 포함할 배열
    const [toDos, setToDos] = useState<ToDo[]>(baseToDos);

    const addToDo = (newTodo: ToDo) =>
        setToDos((prevToDos) => [...prevToDos, newTodo]);

    const deleteToDo = (toDoId: string) =>
        setToDos((prevToDos) => prevToDos.filter((todo) => todo.id !== toDoId));

    const toggleIsDone = (toDoId: string) =>
        setToDos((prevToDos) =>
            prevToDos.map((todo) =>
                todo.id === toDoId ? { ...todo, isDone: !todo.isDone } : todo
            )
        );

    const workingToDos = toDos.filter((todo) => !todo.isDone);
    const doneToDos = toDos.filter((todo) => todo.isDone);

    return (
        <>
            <div className="top_wrapper">
                <header className="my_header">
                    <h3>My Todo List</h3>
                    <p>React</p>
                </header>

                <Form addToDo={addToDo} />

                {/* <section className="input_section">
                    <form className="submit_form" onSubmit={handleSubmit}>
                        <div className="input_area">
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                name="title"
                                required
                                onChange={handleChange}
                                value={todo.title}
                            ></input>
                            <label htmlFor="body">내용</label>
                            <input
                                type="text"
                                name="body"
                                required
                                onChange={handleChange}
                                value={todo.body}
                            ></input>
                        </div>

                        <button type="submit">추가하기</button>
                    </form>
                </section> */}

                <section className="content_section">
                    <div className="content_box">
                        <h2>Working...🔥</h2>
                        <div className="content">
                            {workingToDos.map((e, i) => (
                                <Card
                                    key={i}
                                    deleteToDo={deleteToDo}
                                    toggleIsDone={toggleIsDone}
                                    todo={e}
                                    // toDos={toDos}
                                    // setToDos={setToDos}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="content_box">
                        <h2>Done...🎉</h2>
                        <div className="content">
                            {doneToDos.map((e, i) => (
                                <Card
                                    key={i}
                                    deleteToDo={deleteToDo}
                                    toggleIsDone={toggleIsDone}
                                    todo={e}
                                    // toDos={toDos}
                                    // setToDos={setToDos}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default App;

// 인풋 체인지 핸들러
// 인풋 값이 변경될 때마다 불변성 유지하며 객체 생성하고 setState
// 인풋 할때마다 setState 하는게 불필요해 보여서 lodash 사용하여 debouncing 해줬는데 이게 맞나...?
// 이벤트 핸들러에서 debounce 사용시 즉시 실행 함수로 처리
// React Hook useCallback received a function whose dependencies are unknown. Pass an inline function instead
// 위와 같은 ES Lint 의존성 배열 경고 표시로,
// debounce 를 useCallback 내부에서 실행
// const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         const newTodo = {
//             ...todo,
//             id: toDos.length,
//             [name]: value,
//         };
//         debounce(() => setTodo(newTodo), 300)();
//     },
//     // useCallback 의존성 배열에 todo 와 ES Lint 경고대로 toDos.length 추가
//     // [todo, toDos.length]
//     [setTodo]
// );
