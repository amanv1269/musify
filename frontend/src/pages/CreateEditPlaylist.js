import axios from "axios";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Player from "../components/Player";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import {
  setUser,
  setSelectedSong,
  selectedPlaylistForEdit,
  SetSelectedPlaylistForEdit,
  SetSelectedPlaylist,
} from "../redux/userSlice";

function CreateEditPlaylist() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  // const [selectedSongs, setSelectedSongs] = React.useState([]);
  const { allSongs } = useSelector((state) => state.user);
  // let allSongs = []
  console.log(allSongs);
  const navigate = useNavigate();
  // const [isValid, setIsValid] = React.useState(false);
  const selectUnselectsong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id)) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const onAdd = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `${window.location.origin}/api/songs/add-playlist`,
          {
            name,
            songs: selectedSongs,
          },
          {
            headers: {
              Auhotization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());

        if (response.data.success) {
          toast.success("playlist created succesfully");
          dispatch(setUser(response.data.data));
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());

        toast.error("something went wrong");
      }
    }
  };

  const onEdit = async () => {
    if (name.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          `${window.location.origin}/api/songs/update-playlist`,
          {
            name,
            songs: selectedSongs,
          },
          {
            headers: {
              Auhotization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(HideLoading());

        if (response.data.success) {
          toast.success("playlist updated succesfully");
          dispatch(setUser(response.data.data));
          dispatch(SetSelectedPlaylistForEdit(null));
          dispatch(
            SetSelectedPlaylist({
              name: "All Songs",
              songs: allSongs,
            })
          );
          setName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());

        toast.error("something went wrong");
      }
    }
  };

  useEffect(() => {
    console.log(selectedPlaylistForEdit?.songs);
    if (selectedPlaylistForEdit) {
      setName(selectedPlaylistForEdit?.name);
      // setSelectedSong(selectedPlaylistForEdit?.songs === undefined ?'':selectedPlaylistForEdit?.songs);
    }
  }, []);

  return (
    <div>
      <div className="flex items-center gap-5">
        <i
          class="ri-arrow-left-line text-3xl"
          onClick={() => {
            navigate("/");
          }}
        ></i>
        <h1 className="text-3xl ">Create Playlist</h1>
      </div>
      <div className="flex justify-between gap-3 mt-5">
        <input
          className="w-95"
          type="text"
          placeholder="name"
          value={name}
          disabled={selectedPlaylistForEdit}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button
          className="bg-orange-500 text-white py-2 px-5"
          onClick={() => {
            // if (selectedPlaylistForEdit) {
            //   onEdit();
            //   console.log('okokkk')
            // } else {
            onAdd();
            //   console.log('addddddd')
            // }
          }}
        >
          SAVE
        </button>
      </div>
      <h1 className="my-5 text-2xl">SelectedSongs - {selectedSongs.length}</h1>
      <div className="grid grid-cols-3 gap-3">
        {allSongs.map((song, index) => {
          const isSelected = selectedSongs.find((s) => s._id === song._id);
          return (
            <div>
              <div
                className={`p-2 flex items-center shadow justify-between border cursor-pointer border-grey-300 rounded ${
                  isSelected && "border-active-500 border-2"
                }`}
                onClick={() => selectUnselectsong(song)}
              >
                <h1>{song.titte}</h1>
                <h1>
                  {song.artist}- {song.album}- {song.year}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <Player />
    </div>
  );
}

export default CreateEditPlaylist;
