import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Action, refresh } from "../redux/actions";
import { NedsRaceSummary } from "../nedsApi";
import { secondsUntil } from "../utils";
import "./Race.css";

interface Props {
  /**
   * The race of which to show details for.
   */
  race: NedsRaceSummary;
}

/**
 * Displays a race entry.
 */
export const Race: React.FC<Props> = (props) => {
  const secondsToStart = secondsUntil(props.race.advertised_start.seconds);
  const [count, setCount] = useState(secondsToStart > 0 ? secondsToStart : 0);
  const [dismissCount, setDismissCount] = useState<number | undefined>();

  const dispatch: Dispatch<Action> = useDispatch();

  // A countdown timer until a race starts.
  // After that, a countdown timer until the race list is refreshed.
  useEffect(() => {
    if (count <= 0) {
      if (dismissCount === undefined) {
        setDismissCount(60);
        return;
      }

      if (dismissCount <= 0) {
        dispatch(refresh());
        return;
      }

      const handle = setTimeout(() => {
        setDismissCount(dismissCount - 1);
      }, 1_000);
      return () => clearTimeout(handle);
    }

    const handle = setTimeout(() => {
      setCount(count - 1);
    }, 1_000);
    return () => clearTimeout(handle);
  }, [count, props.race.race_id, dispatch, dismissCount]);

  return (
    <div className="race">
      <h3>
        {props.race.race_name} - Race #{props.race.race_number}
      </h3>
      <p>Location: {props.race.meeting_name}</p>
      {count > 0 ? (
        <p>
          {count} {count === 1 ? "second" : "seconds"} remaining
        </p>
      ) : (
        <p>Race has begun! ({dismissCount})</p>
      )}
    </div>
  );
};
