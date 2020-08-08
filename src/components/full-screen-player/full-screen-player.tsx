import * as React from "react";
import {getTimeLeft} from "../../utils";
import history from '../../history';
import {Movie} from "../../types";

interface Props {
  isPlaying: boolean;
  progress: number;
  duration: number;
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void;
  movie: Movie;
  children: React.ReactNode;
};

const FullScreenPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    movie,
    isPlaying,
    progress,
    duration,
    onPlayButtonClick,
    onFullScreenButtonClick,
    children
  } = props;

  const timeLeft = getTimeLeft(duration - progress);

  return (
    <React.Fragment>
      <div className="player">
        {children}

        <button onClick={() => history.goBack()} type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={progress} max={duration}></progress>
              <div className="player__toggler" style={{left: ((progress * 100) / duration) + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{timeLeft}</div>
          </div>

          <div className="player__controls-row">
            <button onClick={onPlayButtonClick} type="button" className="player__play">
              {isPlaying ?
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"/>
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
                :
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </React.Fragment>}
            </button>
            <div className="player__name">{movie.title}</div>

            <button onClick={onFullScreenButtonClick} type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FullScreenPlayer;
