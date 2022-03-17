import React, { Component } from "react";
import NomineesTable from "../../components/dashboard/nomineeTable";
import {
  faCirclePause,
  faCircleStop,
  faAddressBook,
  faClipboard,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import {
  ExpandedMenu,
  ButtonItem,
  LinkItem,
  State,
  MenuList,
} from "../../components/common/menu";
import { getUnit, updateUnitState } from "../../services/unitService";
import { getNomineesIn } from "../../services/nomineeService";
import { getVotersCountIn } from "../../services/voterService";
import withUserContext from "../../hoc/withUnitContext";
import FlexContainer from "./../../layouts/containers/flexContainer";
import FullCard from "./../../layouts/cards/fullCard";

class Dashboard extends Component {
  state = {
    unit: {},
    totalVotes: "0",
    nominees: [],
  };

  async componentDidMount() {
    const { id: unitId } = this.props.context.user;

    const { data: unit } = await getUnit(unitId);
    const { data: totalVotes } = await getVotersCountIn(unitId);
    const { data: nominees } = await getNomineesIn(unitId, "votes");

    this.setState({ unit, totalVotes, nominees });
  }

  handlePauseClick = async () => {
    const unit = { ...this.state.unit };
    unit.state = unit.state === "S" ? "A" : "S";
    await updateUnitState(unit.nickname, unit.state);
    this.setState({ unit });
  };

  handleStopClick = async () => {
    const unit = { ...this.state.unit };
    unit.state = "F";
    await updateUnitState(unit.nickname, unit.state);
    this.setState({ unit });
  };

  render() {
    const { unit, totalVotes, nominees } = this.state;
    const finished = unit.state === "F";
    const active = unit.state === "A";

    return (
      <FlexContainer>
        <FullCard>
          <ExpandedMenu unit={unit} collapsed={true}>
            <MenuList>
              <State value={unit.state} />
              {!finished && (
                <>
                  <ButtonItem
                    text={active ? "إيقاف العملية" : "بدأ العملية"}
                    icon={faCirclePause}
                    onClick={this.handlePauseClick}
                  />
                  <ButtonItem
                    text={"إنهاء العملية"}
                    icon={faCircleStop}
                    onClick={this.handleStopClick}
                  />
                </>
              )}
              <LinkItem
                text={"إدارة المرشحين"}
                icon={faAddressBook}
                href={"/nominees"}
              />
              <LinkItem
                text={"القائمة الانتخابية"}
                icon={faClipboard}
                href={"/votes"}
              />
              <LinkItem
                text={"تسجيل الخروج"}
                icon={faArrowRightFromBracket}
                href={"/login"}
              />
            </MenuList>
          </ExpandedMenu>
          <NomineesTable
            unit={unit.name}
            nominees={nominees}
            totalVotes={totalVotes}
          />
        </FullCard>
      </FlexContainer>
    );
  }
}

export default withUserContext(Dashboard);
