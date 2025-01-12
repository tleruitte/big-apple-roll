import { useDispatch } from "react-redux";

import { AppDispatch } from "src/app/types";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
