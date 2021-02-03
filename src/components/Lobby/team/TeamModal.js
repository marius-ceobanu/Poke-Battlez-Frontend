import React, {useEffect, useState} from "react";
import {Col, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

import "../../../css/TeamDeck.css";
import PokeBadge from "./PokeBadge";

function TeamModal({open, onClose, updatedTeam}) {

    const testPokemon = {
        "id": 1,
        "teamId": 1,
        "indexId": 1,
        "position": 1,
        "name": "bulbasaur",
        "level": 2,
        "ivHp": 31,
        "ivAttack": 31,
        "ivDefence": 31,
        "ivSpAttack": 31,
        "ivSpDefence": 31,
        "ivSpeed": 28,
        "evHp": 7,
        "evAttack": 30,
        "evDefence": 32,
        "evSpAttack": 0,
        "evSpDefence": 150,
        "evSpeed": 90,
        "gender": "Female",
        "nature": "Brave",
        "heldItem": "master-ball",
        "ability": "chlorophyll",
        "move1": "razor-wind",
        "move2": "cut",
        "move3": "tackle",
        "move4": "growl"
    }

    let emptyPokemon = {
        id: null,
        teamId: null,
        position: null,
        name: "",
        level: 1,
        ivHp: 31,
        ivAttack: 31,
        ivDefence: 31,
        ivSpAttack: 31,
        ivSpDefence: 31,
        ivSpeed: 31,
        evHp: 0,
        evAttack: 0,
        evDefence: 0,
        evSpAttack: 0,
        evSpDefence: 0,
        evSpeed: 0,
        gender: "",
        nature: "",
        heldItem: "",
        ability: "",
        move1: "",
        move2: "",
        move3: "",
        move4: "",

        sprite: ""
    }

    const [pokemon1, setPokemon1] = useState(emptyPokemon);
    const [pokemon2, setPokemon2] = useState(testPokemon);
    const [pokemon3, setPokemon3] = useState(emptyPokemon);
    const [pokemon4, setPokemon4] = useState(emptyPokemon);
    const [pokemon5, setPokemon5] = useState(emptyPokemon);
    const [pokemon6, setPokemon6] = useState(emptyPokemon);

    const team = [
        { pokemon: pokemon1, set: setPokemon1 },
        { pokemon: pokemon2, set: setPokemon2 },
        { pokemon: pokemon3, set: setPokemon3 },
        { pokemon: pokemon4, set: setPokemon4 },
        { pokemon: pokemon5, set: setPokemon5 },
        { pokemon: pokemon6, set: setPokemon6 }
    ];

    // const updateTeam = (receivedTeam) => {
    //     const newTeam = {...team};
    //     theTeam.map(team => {
    //         newTeam[team.position] = team;
    //     })
    //     setTeam(team);
    // };

    let resetTeam = teamId => {
        for (let index in team) {
            let temp = {...emptyPokemon}
            temp.position = index;
            temp.teamId = teamId;

            team[index].set(temp);
        }
    }

    useEffect(() => {
        if(updatedTeam !== null) {
            resetTeam(updatedTeam.id);
            for (let pokemon of updatedTeam.pokemon) {
                team[pokemon.position].set(pokemon);
            }
        }

        // eslint-disable-next-line
    }, [updatedTeam])

    return(
        <Modal show={open} onHide={onClose} size="lg" aria-labelledby="teambuild-modal" >
            <Modal.Header closeButton style={{ backgroundColor: "#696969" }}>
                <Modal.Title id="teambuild-modal" >
                    <h6>Teambuilder</h6>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#DCDCDC" }} >
                <Tab.Container id="modal-menu" defaultActiveKey="#team">
                    <Row>
                        <Col sm={2}>
                            <ListGroup>
                                <ListGroup.Item href={"#team"} style={navItemStyle}>
                                    <img alt={"pokemon"} style={{ marginLeft: "8px" }}
                                        src="https://img.icons8.com/color/36/000000/insignia-1-stars--v1.png"/>
                                </ListGroup.Item>
                                {team.map((pokemon, index) => (
                                    <ListGroup.Item key={index} className={"d-flex p-1 border-2"}
                                                    href={"#poke"+(index+1).toString()}
                                                    style={navItemStyle}>
                                        <PokeBadge slot={pokemon} key={index} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    <div className="container">
                                        <div className="card-deck ml-5">
                                            {team.map((teamMember, index) => (
                                                <PokemonCard key={index} pokemon={teamMember.pokemon} index={index+1} />
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Pane>
                                {team.map((pokemon, index) => (
                                    <Tab.Pane key={index} eventKey={"#poke"+(index+1).toString()}>
                                        <PokemonConfig key={index} teamPokemon={pokemon} onClose={onClose} />
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Modal.Body>
        </Modal>
    );
}

const navItemStyle = {
    cursor: "pointer",
    backgroundColor: "#DCDCDC",
    marginLeft: "6px"
};

export default TeamModal;