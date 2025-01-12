import { createListenerMiddleware } from "@reduxjs/toolkit";

import addCartListeners from "src/app/slices/cart/middlewares/addCartListeners";
import { AppDispatch, AppState } from "src/app/types";

const listenerMiddleware = createListenerMiddleware();

const appStartListening = listenerMiddleware.startListening.withTypes<AppState, AppDispatch>();
export type AppStartListening = typeof appStartListening;

addCartListeners(appStartListening);

export default listenerMiddleware;
