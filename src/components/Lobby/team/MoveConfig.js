import React, {useEffect, useState} from "react";
import {Typeahead} from "react-bootstrap-typeahead";
import {Badge} from "react-bootstrap";
import axios from "axios";

function MoveConfig({ moves, move, save, index, refs, teamIndex }) {
    const baseStats = {"type": "", "acc": 0, "cat": "", "power": 0, "pp": 0};
    const [stats, setStats] = useState(baseStats);

    const trig = () => {
        console.log("triggered");
    }

    const updateStats = (e) => {
        e.preventDefault();
        const moveName = e.target.value;
        fetch(moveName);
        save(e);
    }

    const fetch = (move) => {
        const newStats = {...stats};
        if(move !== "" && move !== "move..." && move !== "None") {
            axios.get(`https://pokeapi.co/api/v2/move/${move}`).then(res => {
                newStats["type"] = res.data.type.name;
                newStats["acc"] = res.data.accuracy === null ? 0 : res.data.accuracy;
                newStats["cat"] = res.data.damage_class.name;
                newStats["power"] = res.data.power === null ? 0 : res.data.power;
                newStats["pp"] = res.data.pp === null ? 0 : res.data.pp;
                setStats(newStats);
            })
        }
    }

    useEffect(() => {
        fetch(move.name);
    }, []);

    return(
        <div className={"p-2"} style={moveInfoStyle}>
            <Typeahead id={"move"+(index+1)} size={"sm"} className={"p-0 mr-1"} style={{minWidth:"130px"}}
                       labelKey={"name"} options={moves}  placeholder={move.name===""?"move...":move.name}
                       inputProps={{"data-save": "move"+(index+1)}} onBlur={updateStats} ref={refs[index+17]}
                       onChange={trig}
            />
            <span className={"type"+teamIndex} style={{fontSize:"small", padding: "-3px"}}>Type{" "}
                <Badge pill variant={"light"}>{stats.type}</Badge>
                            </span><br />
            <span className={"acc"+teamIndex} style={{fontSize:"small"}}>Acc{" "+stats.acc}</span><br />
            <span className={"cat"+teamIndex} style={{fontSize:"small"}}>Cat{" "}
                <Badge pill variant={"light"}>{stats.cat}</Badge>
                            </span><br />
            <span className={"power"+teamIndex} style={{fontSize:"small"}}>Power{" "+stats.power}</span><br />
            <span className={"pp"+teamIndex} style={{fontSize:"small"}}>Pp{" "+stats.pp}</span>
        </div>
    );
}

const moveInfoStyle = {
    borderStyle: "groove"
}

export default MoveConfig;