import React from "react";
import Player from "../components/Player"
import SongsList from "../components/SongsList";
import Playlists from "../components/Playlists";

function Home() {
  // const { user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // const getAllSongs = async () => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axios.post(
  //       "/api/songs/get-all-songs",
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(SetAllSongs(response.data.data));
  //     dispatch(HideLoading());
  //   } catch (error) {}
  //   dispatch(HideLoading());
  // };

  // useEffect(() => {
  //   getAllSongs();
  // }, []);
  return (
    <>
    <div className="flex gap-5">
      <div className="w-1/2">
        <SongsList />
      </div>
      <div className="w-1/2"> 
        <Playlists />
      </div>
    </div>
    <Player/>
    </>
  );
}

export default Home;
