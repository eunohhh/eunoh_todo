import { ToDo } from "../d";
import "./card.css";

type TodoProps = {
    todo: ToDo;
    input: ToDo;
    toDos: ToDo[];
    setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

export default function Card({ todo, toDos, input, setToDos }: TodoProps) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const copied = [...toDos];
        if (e.currentTarget.id === "fin") {
            if (todo.isDone) {
                alert("이미 완료되었습니다!");
                return;
            }
            const mapped = copied.map((e) => {
                e.id === todo.id ? (e.isDone = true) : e;
                return e;
            });
            setToDos(mapped);
        } else if (e.currentTarget.id === "update") {
            if (input.title === todo.title && input.body === todo.body) {
                alert("바뀐 내용이 없네요!");
                return;
            } else if (input.title === "" || input.body === "") {
                alert("입력 값이 없는 것 같아요 확인 부탁");
                return;
            } else {
                const mapped = copied.map((e) => {
                    if (e.id === todo.id) {
                        return {
                            ...e,
                            title: input.title,
                            body: input.body,
                        };
                    } else {
                        return e;
                    }
                });
                setToDos(mapped);
            }
        } else if (e.currentTarget.id === "del") {
            const filtered = copied.filter((e) => e.id !== todo.id);
            setToDos(filtered);
        }
    };

    return (
        <section className={`card ${todo.isDone ? "done" : "work"}`}>
            <div className="card_top">
                <h3>{todo.title}</h3>
                <p>{todo.body}</p>
            </div>
            <div className="card_buttons">
                <div className="btn del" id="del" onClick={handleClick}>
                    삭제
                </div>
                <div className="btn update" id="update" onClick={handleClick}>
                    수정
                </div>
                <div className="btn fin" id="fin" onClick={handleClick}>
                    완료
                </div>
            </div>
        </section>
    );
}
