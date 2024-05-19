import "./App.css";
import Layout from "./components/Layout";
import ToDoContainer from "./components/ToDoContainer";

function App() {
    return (
        <Layout>
            <ToDoContainer />
        </Layout>
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
