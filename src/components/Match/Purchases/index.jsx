import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import TeamTable from '../TeamTable';
import mcs from '../matchColumns';

const toggleStyle = {
  width: '30px',
  float: 'right',
  position: 'relative',
  right: '10px',
  top: '15px',
  border: '1px solid rgba(179, 179, 179, 0.1)',
  padding: '2px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
};

class Purchases extends React.Component {
  static propTypes = {
    match: PropTypes.shape({}),
    strings: PropTypes.shape({}),
    sponsorURL: PropTypes.string,
    sponsorIcon: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      showConsumables: false,
    };
    this.change = () => {
      const { showConsumables } = this.state;
      this.setState({ showConsumables: !showConsumables });
    };
  }

  render() {
    const {
      match, strings, sponsorURL, sponsorIcon,
    } = this.props;
    const { purchaseTimesColumns } = mcs(strings);
    return (
      <div>
        <Toggle
          label={strings.show_consumables_items}
          labelStyle={{ color: '#b3b3b3', lineHeight: '13px', fontSize: '14px' }}
          style={toggleStyle}
          onToggle={this.change}
          thumbStyle={{ backgroundColor: 'rgb(179, 179, 179)', marginTop: '2px' }}
          trackStyle={{ position: 'absolute', marginTop: '2px' }}
        />
        <TeamTable
          players={match.players}
          columns={purchaseTimesColumns(match, this.state.showConsumables)}
          heading={strings.heading_purchase_log}
          buttonLabel={strings.gosu_default}
          buttonTo={`${sponsorURL}Purchases`}
          buttonIcon={sponsorIcon}
          radiantTeam={match.radiant_team}
          direTeam={match.dire_team}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Purchases);
