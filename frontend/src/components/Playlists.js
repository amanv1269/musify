import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  setUser,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, SelectedPlaylist } = useSelector(
    (state) => state.user
  );
  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.playlists,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/songs/delete-playlists",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success("playlist deleted succesfully");
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());

      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (!SelectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylists[0]));
    }
    console.log(allSongs);
  }, [SelectedPlaylist, allSongs]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-secondary text-2xl"> Your Playlists</h1>
        <h1
          className="underline cursor-pointer text-xl text-secondary"
          onClick={() => {
            navigate("/create-edit-playlist");
          }}
        >
          Create playlist
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-10">
        {allPlaylists?.map((Playlists, index) => {
          const isSelected = Playlists?.name === SelectedPlaylist?.name;
          return (
            <div
              className={`flex flex-col gap-1 shadow border p-2 rounded cursor-pointer ${
                isSelected && "border-active border-2 "
              }`}
              onClick={() => {
                dispatch(SetSelectedPlaylist(Playlists));
              }}
            >
              <h1 className="text-3xl  ">{Playlists?.name}</h1>
              <h1 className="text-xl">{Playlists?.songs?.length} songs</h1>
              <hr />
              <div className="flex gap-3 justify-between">
                <i
                  class="ri-delete-bin-line text-2xl text-gray-500"
                  onClick={() => {
                    onDelete(Playlists.name);
                  }}
                ></i>
                <i
                  class="ri-edit-line text-2xl text-gray-500"
                  onClick={() => {
                    dispatch(SetSelectedPlaylistForEdit(Playlists));
                    navigate(`/create-edit-playlist`);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
