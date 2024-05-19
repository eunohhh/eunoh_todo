import { ToDo } from "../../d";
import Card from "../Card";
import "../Card/Card.css";

type CardListProps = {
    title: string;
    toDos: ToDo[];
    deleteToDo: (arg: string) => void;
    toggleIsDone: (arg: string) => void;
};

function CardList({ title, toDos, deleteToDo, toggleIsDone }: CardListProps) {
    return (
        <section className="content_box">
            <h2>{title}</h2>
            <div className="content">
                {toDos.map((e, i) => (
                    <Card
                        key={i}
                        deleteToDo={deleteToDo}
                        toggleIsDone={toggleIsDone}
                        todo={e}
                    />
                ))}
            </div>
        </section>
    );
}

export default CardList;
