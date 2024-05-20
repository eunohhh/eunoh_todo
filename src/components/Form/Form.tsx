// import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import "../../App.css";
// import { Todo } from "../../types/supabase";
import { AppDispatch } from "../../store/store";
import { addToDo } from "../../store/todoSlice";

// type FormProps = {
//     addToDo: (arg: Todo) => void;
// };

const InputSection = styled.section`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    background-color: rgb(222, 222, 222);
    color: rgb(79, 79, 79);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1rem;
`;

const SubmitForm = styled.form`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > button {
        background: var(--button-bg-color);
        color: var(--button-color);
        margin: 0;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        text-decoration: none;
        border: none;
        border-radius: 4px;
        display: inline-block;
        width: auto;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        cursor: pointer;
        transition: 0.5s;
    }
    button:active,
    button:hover,
    button:focus {
        background: var(--button-hover-bg-color);
        outline: 0;
    }
    button:disabled {
        opacity: 0.5;
    }
`;

const InputArea = styled.div`
    width: 80%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;

    & > input {
        color: rgb(79, 79, 79);
        font-size: 16px;
        font-size: max(16px, 1em);
        font-family: inherit;
        padding: 0.25em 0.5em;
        background-color: #fff;
        border: 2px solid var(--input-border);
        border-radius: 4px;
    }
    input:nth-child(4) {
        width: 50%;
    }
`;

const Form = () => {
    const dispatch: AppDispatch = useDispatch();

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
            title,
            body: content,
            isDone: false,
            created_at: new Date().toISOString(), // ISO 문자열로 변환
        };
        dispatch(addToDo(newTodo));

        // 추가하고 나면 폼 리셋 시키기!!
        form.reset();
    };

    return (
        <InputSection>
            <SubmitForm onSubmit={handleSubmit}>
                <InputArea>
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
                </InputArea>

                <button type="submit">추가하기</button>
            </SubmitForm>
        </InputSection>
    );
};

export default Form;

// addToDo: React.Dispatch<React.SetStateAction<ToDo>>;

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
