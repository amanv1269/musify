import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminHome(params) {
  const [selectedSongForEdit, setSelectedSongForEdit] = React.useState([]);
  const { allSongs, user, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = React.useState("");

  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist &&
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const tempSongs = [];

        selectedPlaylist.songs.forEach((song) => {
          if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
            tempSongs.push(song);
          }
        });
        console.log(tempSongs);
        setSelectedSongForEdit(tempSongs);
      } else {
        setSelectedSongForEdit(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist]);

  useEffect(() => {
    if (user) {
      if ((user?.isAdmin && !user.isAdmin) || !user?.isAdmin) {
        navigate("/");
      }
    }
    console.log(allSongs);
  }, [user]);

  return (
    <div>
      <div className="between">
        <h1 className="text-3xl text-gray-700">All Songs</h1>
        <button
          className="text-white bg-orange-500 py-2 px-5"
          onClick={() => {
            navigate(`${window.location.origin}/admin/add-edit-song`);
          }}
        >
          Add Song
        </button>
      </div>
      <table className="w-full mt-5">
        <thead className="w-full">
          <tr>
            <th>Titile</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.tittle}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.year}</td>
              <td>{song.duration}</td>
              <td>
                <i
                  class="ri-edit-line text-2xl text-gray-500"
                  onClick={() => {
                    navigate(
                      `${window.location.origin}/admin/add-edit-song/?=` +
                        song._id
                    );
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHome;
