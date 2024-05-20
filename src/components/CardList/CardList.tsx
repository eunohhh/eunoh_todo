import styled from "styled-components";
import { Todo } from "../../types/supabase";
import Card from "../Card";

type CardListProps = {
    title: string;
    toDos: Todo[];
    // deleteToDo: (arg: number) => void;
    // toggleIsDone: (arg: number) => void;
};

const ContentSection = styled.section`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const ContentH2 = styled.h2`
    font-size: 1.6rem;
    font-weight: 600;
    color: rgb(79, 79, 79);
    padding-bottom: 0.5rem;
    box-sizing: border-box;
`;

const ContentDiv = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
`;

function CardList({ title, toDos }: CardListProps) {
    return (
        <ContentSection>
            <ContentH2>{title}</ContentH2>
            <ContentDiv className="content">
                {toDos.map((e, i) => (
                    <Card key={i} todo={e} />
                ))}
            </ContentDiv>
        </ContentSection>
    );
}

export default CardList;
