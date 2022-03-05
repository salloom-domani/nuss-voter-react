import React, { Component } from 'react';
import NomineesTable from "../../components/dashboard/nomineeTable";
import { ExpandedMenu } from "../../components/common/menu";
import http from "../../services/httpService";
import withUnitContext from '../../hoc/withUnitContext';

class Dashboard extends Component {
    constructor(props) {
      super(props);

      // const unitContext = this.props.context;

      this.state = {
        unit: {
          name: "",
          state: "",
        },
        totalVotes: "0",
        nominees: [],
      };
    }
  
    async componentDidMount() {
      // const unitId = this.props.location.state.unit;
      const unitId = this.props.context.unit.pk;

      const { data: unitData } = await http.get(
        `http://localhost:8000/units/${unitId}`
      );
  
      const { data: totalVotesData } = await http.get(
        `http://localhost:8000/voters/total-in/${unitId}`
      );
      const totalVotes = totalVotesData['total_votes'];
  
      const { data: nominees } = await http.get(
        `http://localhost:8000/nominees/?ordering=-votes_count&unit=${unitId}`
      );
      
      const unit = { ...this.state.unit };
      unit.name = unitData.name;
      unit.state = unitData.state;
      this.setState({ unit, totalVotes, nominees });
    }
  
    render() {
      const { unit, totalVotes, nominees } = this.state;
      return (
        <div className="container-flex">
          <section className="card card--full">
            <ExpandedMenu unit={unit} />
            <NomineesTable unit={unit.name} nominees={nominees} totalVotes={totalVotes} />
          </section>
        </div>
      );
    }
  }

export default withUnitContext(Dashboard);