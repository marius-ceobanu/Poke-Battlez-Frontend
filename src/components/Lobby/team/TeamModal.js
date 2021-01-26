import React, {useState} from "react";
import {Col, ListGroup, Modal, Row, Tab} from "react-bootstrap";
import PokemonCard from "./PokemonCard";
import PokemonConfig from "./PokemonConfig";

import "../../../css/TeamDeck.css";
import PokeBadge from "./PokeBadge";

function TeamModal({open, onClose}) {

    const [team, setTeam] = useState([{"name": 1}, {"name": 2}, {}, {}, {}, {"name": 6}]);

    return(
        <Modal
            show={open}
            onHide={onClose}
            size="lg"
            aria-labelledby="teambuild-modal"
        >
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
                                    <img style={{ marginLeft: "8px" }}
                                        src="https://img.icons8.com/color/36/000000/insignia-1-stars--v1.png"/>
                                </ListGroup.Item>
                                {team.map((slot, index) => (
                                    <ListGroup.Item className={"d-flex p-1 border-2"}
                                                    href={"#poke"+(index+1).toString()}
                                                    style={navItemStyle}>
                                        <PokeBadge slot={slot} key={index} />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#team">
                                    <div className="container">
                                        <div className="card-deck ml-5">
                                            {team.map((slot, index) => (
                                                <PokemonCard key={index} slot={slot} index={index+1} />
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Pane>
                                {team.map((slot, index) => (
                                    <Tab.Pane eventKey={"#poke"+(index+1).toString()}>
                                        <PokemonConfig slot={slot}
                                                       team={team}
                                                       key={index}
                                                       teamIndex={index+1}
                                                       setTeam={(newTeam) => setTeam(newTeam)} />
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