import { memo } from "react";
import { ToDo } from "../../d";
import "./Card.css";

type TodoProps = {
    todo: ToDo;
    deleteToDo: (arg: string) => void;
    toggleIsDone: (arg: string) => void;
};

const Card = memo(({ todo, deleteToDo, toggleIsDone }: TodoProps) => {
    // 클릭 핸들러
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === "fin_cancel") {
            toggleIsDone(todo.id);
        } else if (e.currentTarget.id === "del") {
            deleteToDo(todo.id);
        }
    };

    return (
        <ul className={`card ${todo.isDone ? "done" : "work"}`}>
            <div className="card_top">
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
            </div>
            <div className="card_buttons">
                <div className="btn del" id="del" onClick={handleClick}>
                    삭제
                </div>
                {/* <div className="btn update" id="update" onClick={handleClick}>
                    수정
                </div> */}
                <div className="btn fin" id="fin_cancel" onClick={handleClick}>
                    {todo.isDone ? "취소" : "완료"}
                </div>
            </div>
        </ul>
    );
});

export default Card;

// function areEqual(prevProps: TodoProps, nextProps: TodoProps) {
//     return prevProps.todo.id === nextProps.todo.id && prevProps.todo.isDone === nextProps.todo.isDone;
// }

// 투두 완료로 처리
// const completeToDo = (copied: ToDo[]) => {
//     // 현재 컴포넌트 데이터(todo)의 id 와 일치하는 id를 가진 객체를 toDos 배열에서 찾아서
//     // 찾은 객체의 isDone 상태를 true 로 변경
//     const mapped = copied.map((e) => {
//         if (e.id === todo.id) e.isDone = !e.isDone;
//         return e;
//     });
//     setToDos(mapped);
// };

// 투두 업데이트
// 업데이트할 내용은 props 로 받은 input
// const updateToDo = (copied: ToDo[]) => {
//     if (inputted.title === todo.title && inputted.body === todo.body) {
//         alert("바뀐 내용이 없네요!");
//         return;
//     } else if (inputted.title === "" || inputted.body === "") {
//         alert("입력 값이 없는 것 같아요 확인 부탁");
//         return;
//     } else {
//         // 현재 컴포넌트 데이터(todo)의 id 와 일치하는 id를 가진 객체를 toDos 배열에서 찾아서
//         // 찾은 객체의 title, body 값을 변경
//         const mapped = copied.map((e) => {
//             if (e.id === todo.id) {
//                 return {
//                     ...e,
//                     title: inputted.title,
//                     body: inputted.body,
//                 };
//             } else {
//                 return e;
//             }
//         });
//         setToDos(mapped);
//     }
// };

// 투두 삭제
// const deleteToDo = (copied: ToDo[]) => {
//     // 현재 컴포넌트 데이터의 id 와 일치하지 않는 값만 반환(현재 값은 삭제해야 하므로)
//     const filtered = copied.filter((e) => e.id !== todo.id);
//     setToDos(filtered);
// };

// type TodoProps = {
//     todo: ToDo;
//     deleteToDo: (arg: string) => void;
//     toggleIsDone: (arg: string) => void;
//     inputted: ToDo;
//     toDos: ToDo[];
//     setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
// };
