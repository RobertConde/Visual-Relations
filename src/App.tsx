import React, {useState} from 'react';
import {Set} from "./FunMath";

function parseListText(text: string): number[] {
    return text.replace(" ", "")
        .split(",")
        .filter(str => str.length > 0)
        .map(str => parseInt(str));
}

function App() {
    const [inputSpaceText, updateInputSpaceText] = useState<string>("");
    const [outputSpaceText, updateOutputSpaceText] = useState<string>("");

    const inputSpace: Set<number> = new Set<number>(parseListText(inputSpaceText));
    const outputSpace: Set<number> = new Set<number>(parseListText(outputSpaceText));

    const mappings: Set<[number, number]> = inputSpace.cartesian_product(outputSpace);

    const relations: Set<Set<[number, number]>> = mappings.power_set();

    return (
        <div className={"p-2"}>
            <div>
                <label>
                    <b>Input Space (Set A): </b>
                    <input type={"text"} className={"border-2"}
                           onBlur={e => updateInputSpaceText(e.target.value)}/>
                </label><br/>
                ⇒{inputSpace.toString()}<br/>

                <label>
                    <b>Output Space (Set B): </b>
                    <input type={"text"} className={"border-2"}
                           onBlur={e => updateOutputSpaceText(e.target.value)}/>
                </label><br/>
                ⇒{outputSpace.toString()}
            </div>

            <div>
                <h2><u>All Possible Mappings from Set A to Set B ({mappings.size} Mappings)</u></h2>
                {mappings.toString()}

                <h2><u>All Possible Relations from Set A to Set B
                    (2<sup>{mappings.size}</sup> = {relations.size} Relations)</u></h2>
                {relations.elements.slice(0, 100)
                    .map((rel, rel_ind) => <>[{rel_ind + 1}] {rel.toString()}<br/></>)}
            </div>
        </div>
    );
}

export default App;
