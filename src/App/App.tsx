import React from "react";
import "./App.css";
import { Race } from "../Race/Race";
import { useSelector } from "react-redux";
import { selectRaces } from "../redux/selectors";
import { FilterButton } from "../FilterButton/FilterButton";
import { RaceCategory } from "../nedsApi";
import { State } from "../redux/state";

interface Props {
  /**
   * The maximum number of races to display.
   */
  maxRaces: number;
}

/**
 * The contents of this upcoming races app.
 */
export const App: React.FC<Props> = (props) => {
  const races = useSelector((state: State) =>
    selectRaces(state, props.maxRaces)
  );

  return (
    <div className="App">
      <div className="buttons">
        <span className="label">Filter</span>
        {[RaceCategory.Greyhound, RaceCategory.Harness, RaceCategory.Horse].map(
          (c, i) => (
            <FilterButton category={c} key={i} />
          )
        )}
      </div>
      <div className="races">
        {races.map((r) => (
          <Race race={r} key={r.race_id} />
        ))}
      </div>
    </div>
  );
};
