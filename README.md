## Todo List 만들기

-   분리한 컴포넌트는 개별 Todo 카드들 입니다.
-   components 폴더에 card.tsx 로 작성하고 App.tsx 에서 import 하였습니다.
-   부모 컴포넌트로 부터 받는 props 는 총 4개로 아래와 같습니다.
-   렌더링에 필요한 todo : 이 객체로 개별 카드의 내용을 데이터 바인딩 합니다.
-   전체 배열 toDos : todo들이 들어있는 배열로 삭제 수정시 업데이트 합니다.
-   사용자가 입력한 값 inputted : 수정시 이 prop 을 사용하여 업데이트 합니다.
-   setState 인 setToDos : 삭제, 수정, 완료 처리시 이 setToDos 함수를 사용하여 state 를 업데이트 합니다.
