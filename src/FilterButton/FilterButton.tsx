import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { RaceCategory } from "../nedsApi";
import { Action, toggleFilterMode } from "../redux/actions";
import { selectFilterMode } from "../redux/selectors";
import { getRaceCategoryName } from "../utils";
import "./FilterButton.css";

interface Props {
  /**
   * The category this button represents.
   */
  category: RaceCategory;
}

/**
 * Displays a filter button.
 *
 * Will dispatch an action to toggle the filter mode.
 */
export const FilterButton: React.FC<Props> = (props) => {
  const dispatch: Dispatch<Action> = useDispatch();
  const mode = useSelector(selectFilterMode);

  return (
    <button
      type="button"
      className="filter-button"
      data-active={mode === props.category}
      onClick={() => dispatch(toggleFilterMode(props.category))}
    >
      {getRaceCategoryName(props.category)}
    </button>
  );
};
