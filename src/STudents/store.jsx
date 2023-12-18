import { createSlice } from "@reduxjs/toolkit";

export const StudentSLice = createSlice({
    name: "students",
    initialState: {
        studentlist: [],
    },
    reducers: {
        setStudentlist: (state, action) => {
            state.studentlist = action.payload
        },
        addStudentToList: (state, action) => {
            state.studentlist.unshift(action.payload)
        },
        updateUser: (state, action) => {
            let tempva = JSON.parse(JSON.stringify(state.studentlist))
            let index = tempva.findIndex(item => item.id === action.payload.id)
            if (index >= 0) {
                tempva[index] = action.payload
            } else {
                tempva.append(action.payload)
            }
            state.studentlist = tempva
            console.log(tempva)
        },
        deleteSTudentAction: (state, action) => {
            let tempva = JSON.parse(JSON.stringify(state.studentlist))
            state.studentlist = tempva.filter(item => item.id !== action.payload)
        },

    },
});

export const {
    setStudentlist,
    addStudentToList,
    deleteSTudentAction,
    updateUser
} = StudentSLice.actions;
export default StudentSLice.reducer;
