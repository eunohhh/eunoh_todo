import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
// import { useState } from "react";

import "./App.css";
import Card from "./components/card";
import { ToDo } from "./d";

const baseToDos = [
    {
        id: new Date().getTime().toString(36),
        title: "리액트 공부하기",
        body: "리액트 기초를 공부해 봅시다",
        isDone: false,
    },
    {
        id: new Date().getTime().toString(36),
        title: "잠자기",
        body: "잠을 잘 자자",
        isDone: true,
    },
];

function App() {
    // 모든 투두 객체들을 포함할 배열
    const [toDos, setToDos] = useState<ToDo[]>(baseToDos);
    // 인풋 값으로 계속 변경될 하나의 투두 객체
    const [todo, setTodo] = useState<ToDo>({
        id: new Date().getTime().toString(36),
        title: "",
        body: "",
        isDone: false,
    });

    // useCallback useMemo 여러가지 써보다가 방법은 알겠는데, 의존성 배열 관련 ES Lint 에러, 경고를 다 없앨 수 없어서
    // 그냥 ref 에 넣어서 고정시켜버렸음
    // debounce interval 300ms
    const debounced = useRef(debounce(setTodo, 200)).current;

    // 인풋 체인지 핸들러
    // 인풋 값이 변경될 때마다 불변성 유지하며 객체 생성하고 debounced에서 반환된 setTodo로 setState
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const id = new Date().getTime().toString(36);
        debounced((prevTodo) => ({
            ...prevTodo,
            id: id,
            isDone: false,
            [name]: value,
        }));
    };

    // 폼 서브밋 핸들러
    // 인풋핸들러에서 설정된 투두 객체를 투두스 배열에 추가
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todo) setToDos([...toDos, todo]);
    };

    // clean up 도 꼭 챙겨주기...
    // 안그러면 300ms 가 짧긴 해도 메모리 손실
    useEffect(() => {
        return () => debounced.cancel();
    }, [debounced]);

    // console.log(todo);
    console.log(toDos);

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
                                // value={todo.title}
                            ></input>
                            <label htmlFor="body">내용</label>
                            <input
                                type="text"
                                name="body"
                                required
                                onChange={handleChange}
                                // value={todo.body}
                            ></input>
                        </div>

                        <button type="submit">추가하기</button>
                    </form>
                </section>

                <section className="content_section">
                    <div className="content_box">
                        <h2>Working...🔥</h2>
                        <div className="content">
                            {toDos
                                .filter((e) => !e.isDone)
                                .map((e, i) => (
                                    <Card
                                        key={i}
                                        todo={e}
                                        toDos={toDos}
                                        inputted={todo}
                                        setToDos={setToDos}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="content_box">
                        <h2>Done...🎉</h2>
                        <div className="content">
                            {toDos
                                .filter((e) => e.isDone)
                                .map((e, i) => (
                                    <Card
                                        key={i}
                                        todo={e}
                                        toDos={toDos}
                                        inputted={todo}
                                        setToDos={setToDos}
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
