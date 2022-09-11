import { lang } from "~/store";

import en from "./en";
// import ar from "./ar";

let language: string;
lang.subscribe(value => language = value);

export default () => en;
// export default () => language === "ar" ? ar : en;
