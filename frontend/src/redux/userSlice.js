import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    allSongs: [],
    tempAllSongs: [],
    currentSong: null,
    currentSongIndex: 0,
    selectedPlaylist: null,
    selectedPlaylistForEdit : null,
    isPlaying : false,
    currentTime : 0,
   
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    SetCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    SetSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    selectedPlaylistForEdit: (state, action) => {
      state.selectedPlaylistForEdit = action.payload;
    },
    SetIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    SetCurrentTime:(state,action) =>{
      state.currentTime = action.payload;
    }
   
  },
});

export const {
  setUser,
  SetAllSongs,
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist,
  selectedPlaylistForEdit,
  SetSelectedPlaylistForEdit,
  setSelectedSong,
  SetIsPlaying,
  SetCurrentTime
} = userSlice.actions;
