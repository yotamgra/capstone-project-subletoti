import { useState } from "react";

export const useGeneralHook = () => {
    const [isPostFormExpended,setIsPostFormExpended] = useState(false)

    return [isPostFormExpended,setIsPostFormExpended]
};
