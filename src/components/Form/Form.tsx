// import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../../App.css";
import { ToDo } from "../../d";

type FormProps = {
    addToDo: (arg: ToDo) => void;
};

const Form = ({ addToDo }: FormProps) => {
    // 인풋 값으로 계속 변경될 하나의 투두 객체
    // const [todo, setTodo] = useState<ToDo>({
    //     id: "",
    //     title: "",
    //     body: "",
    //     isDone: false,
    // });

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     const newTodo = {
    //         ...todo,
    //         [name]: value,
    //     };
    //     setTodo(newTodo);
    // };

    // 폼 서브밋 핸들러
    // 인풋핸들러에서 설정된 투두 객체를 투두스 배열에 추가
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get("title")?.toString();
        const content = formData.get("body")?.toString();

        if (!title || !content) return;

        if (!title?.trim() || !content?.trim()) {
            alert("내용을 입력해 주세요!");
        }
        const newTodo = {
            id: uuidv4(),
            title,
            body: content,
            isDone: false,
        };
        addToDo(newTodo);

        // 추가하고 나면 폼 리셋 시키기!!
        form.reset();
    };

    return (
        <div className="input_section">
            <form className="submit_form" onSubmit={handleSubmit}>
                <div className="input_area">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        name="title"
                        required
                        // onChange={handleChange}
                        // value={todo.title}
                    ></input>
                    <label htmlFor="body">내용</label>
                    <input
                        type="text"
                        name="body"
                        required
                        // onChange={handleChange}
                        // value={todo.body}
                    ></input>
                </div>

                <button type="submit">추가하기</button>
            </form>
        </div>
    );
};

export default Form;

// addToDo: React.Dispatch<React.SetStateAction<ToDo>>;
