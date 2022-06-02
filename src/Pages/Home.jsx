import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Video from "../Component/Video";
import useVideos from "../Hooks/useVideos";
import style from "../Styles/Videos.module.css";

export default function Home() {
    const [page, setPage] = useState(1);
    const { loading, erros, videos, hasMore } = useVideos(page);

    return (
        <div>
            {videos.length > 0 && (
                <InfiniteScroll
                    className={style.videos}
                    dataLength={videos.length}
                    next={() => setPage(page + 8)}
                    hasMore={hasMore}
                    loader="Loading..."
                >
                    {videos.map((video) =>
                        video.noq > 0 ? (
                            <Link
                                to={`/quiz/${video.youtubeID}`}
                                key={video.youtubeID}
                            >
                                <Video
                                    title={video.title}
                                    id={video.youtubeID}
                                    noq={video.noq}
                                />
                            </Link>
                        ) : (
                            <Video
                                title={video.title}
                                key={video.youtubeID}
                                id={video.youtubeID}
                                noq={video.noq}
                            />
                        )
                    )}
                </InfiniteScroll>
            )}
            {loading && <h2>Loading...</h2>}
            {videos.length < 0 && !erros && <h2>Data not found</h2>}
            {erros && <h2>Something wrong happen</h2>}
        </div>
    );
}
