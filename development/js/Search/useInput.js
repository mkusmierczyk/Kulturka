import {useState} from "react";

export default (valueOnStart) => {
    const [value, setValue] = useState(valueOnStart);

    return [
        value,
        {
            value,
            onChange: e => {
                setValue(e.target.value);
            }
        }
    ]
};