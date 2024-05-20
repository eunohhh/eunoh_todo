// todoSlice.js
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import supabase from "../supabaseClient";
import type { Todo } from "../types/supabase";

// 비동기 Thunk 액션 생성
export const getToDos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        const { data, error } = await supabase.from("todolist").select("*");

        if (error) {
            console.log("error => ", error);
            return rejectWithValue("Failed to fetch todos");
        }

        if (!data) {
            return rejectWithValue("No data available");
        }

        return data as Todo[];
    }
);

// 비동기 Thunk 액션 생성
export const addToDo = createAsyncThunk<
    Todo,
    Partial<Todo>,
    { rejectValue: string }
>("todos/addTodo", async (newTodo, { rejectWithValue }) => {
    const { data, error } = await supabase
        .from("todolist")
        .insert([newTodo])
        .select()
        .single();

    if (error) {
        console.log("error => ", error);
        return rejectWithValue("Failed to add todo");
    }

    if (!data) {
        return rejectWithValue("No data available");
    }

    return data as Todo;
});

export const updateToDo = createAsyncThunk<
    Todo,
    Pick<Todo, "id" | "isDone">,
    { rejectValue: string }
>("todos/updateTodo", async ({ id, isDone }, { rejectWithValue }) => {
    const { data, error } = await supabase
        .from("todolist")
        .update({ isDone: !isDone })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.log("error => ", error);
        return rejectWithValue("Failed to add todo");
    }

    if (!data) {
        return rejectWithValue("No data available");
    }

    return data as Todo;
});

export const deleteToDo = createAsyncThunk<
    Promise<ErrorConstructor | undefined>,
    number
>("todos/deleteTodo", async (todoId) => {
    const { error } = await supabase.from("todolist").delete().eq("id", todoId);

    if (error) {
        console.log("error => ", error);
        return Error;
    }
});

interface ToDoState {
    toDos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: ToDoState = {
    toDos: [] as Todo[],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addToDo: (state, action: PayloadAction<Todo>) => {
            state.toDos.push(action.payload);
        },
        deleteToDo: (state, action: PayloadAction<number>) => {
            state.toDos = state.toDos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        toggleIsDone: (state, action: PayloadAction<number>) => {
            const todo = state.toDos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.isDone = !todo.isDone;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getToDos.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getToDos.fulfilled,
                (state, action: PayloadAction<Todo[]>) => {
                    state.loading = false;
                    state.toDos = action.payload;
                }
            )
            .addCase(getToDos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(addToDo.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                addToDo.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    state.loading = false;
                    state.toDos.push(action.payload);
                }
            )
            .addCase(addToDo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            })
            .addCase(updateToDo.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                updateToDo.fulfilled,
                (state, action: PayloadAction<Todo>) => {
                    state.loading = false;
                    const index = state.toDos.findIndex(
                        (todo) => todo.id === action.payload.id
                    );
                    if (index !== -1) {
                        state.toDos[index] = action.payload;
                    }
                }
            )
            .addCase(updateToDo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    },
});

// export const { deleteToDo, toggleIsDone } = todoSlice.actions;
export default todoSlice.reducer;

// const response = await axios.get("http://localhost:3001/todos");
// return response.data;

// addToDo: (state, action: PayloadAction<Todo>) => {
//     state.toDos.push(action.payload);
// },
// deleteToDo: (state, action: PayloadAction<number>) => {
//     state.toDos = state.toDos.filter(
//         (todo) => todo.id !== action.payload
//     );
// },
// toggleIsDone: (state, action: PayloadAction<number>) => {
//     const todo = state.toDos.find((todo) => todo.id === action.payload);
//     if (todo) {
//         todo.isDone = !todo.isDone;
//     }
// },
