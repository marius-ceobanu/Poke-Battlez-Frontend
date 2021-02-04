import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import LobbyNavbar from "./layout/LobbyNavbar";
import Chat from "./Chat";
import {connect} from "../../controller/AccountController";
import {UserContextProvider} from "./account/UserContext";
import TeamModal from "./team/TeamModal";
import RegisterModal from "./account/RegisterModal";
import PmModal from "./PmModal";

function Lobby() {
    const [registered, setRegistered] = useState(false);
    const [first, setFirst] = useState(true);

    const [showTeam, setShowTeam] = useState(false);
    const[updatedTeam, setUpdatedTeam] = useState(null);

    const[showPmModal, setShowPmModal] = useState(false);
    const[pmTo, setPmTo] = useState(null);

    // const setPmDestination = (user) => {
    //     setPmTo(user);
    // }

    if (first) {
	    connect();
	    setFirst(false);
    }

    return(
        <div className={"Lobby vh-100"}>
            <UserContextProvider>
                <LobbyNavbar openTeam={() => setShowTeam(true)} />
                <Chat setTeam={(newTeam) => setUpdatedTeam(newTeam)} openPm={() => setShowPmModal(true)} toPm={setPmTo} />
                <RegisterModal open={!registered} onClose={() => setRegistered(true)} />
                <TeamModal open={showTeam} onClose={() => setShowTeam(false)} updatedTeam={updatedTeam} />
                <PmModal open={showPmModal} close={() => setShowPmModal(false)} to={pmTo}/>
            </UserContextProvider>
        </div>
    );
}

export default Lobby;