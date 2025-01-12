import { useSelector } from "react-redux";

import { AppState } from "src/app/types";

const useAppSelector = useSelector.withTypes<AppState>();

export default useAppSelector;
