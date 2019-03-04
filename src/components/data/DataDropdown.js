import React from 'react';
import {Query} from "react-apollo";
import {Dropdown, Message} from "semantic-ui-react";
import gql from "graphql-tag";
import {UI} from "../../utilities/Enum";
import {Link} from "react-router-dom";

const GET_UNIT_DATASET = gql`
    query listDatasets {
        UnitDataSet {
            edges {
                cursor
                node {
                    name {
                        languageCode
                        languageText
                    }
                    description {
                        languageCode
                        languageText
                    }
                }
            }
        }
    }
`;

/**
 * Renders a dropdown with datasets from LDS.
 */
const DataDropdown = ({languageCode, disabled}) => (
  <Query query={GET_UNIT_DATASET}>
    {({loading, error, data}) => {

      let label = UI.DATA_MENU[languageCode];
      if (loading) return <Dropdown item scrolling text={label} loading disabled/>;
      if (error) return <Dropdown item scrolling text={label} error>
        <Message error header='Error' content={JSON.stringify(error)}/>
      </Dropdown>;

      // Extract the UnitDataSet.
      const datasets = [];
      const {UnitDataSet: {edges}} = data;
      for (const edge of edges) {
        const {
          cursor: id,
          node: {
            name: [{languageText: name}],
            description: [{languageText: description}]
          }
        } = edge;
        datasets.push({id, name, description})
      }

      return <Dropdown item scrolling text={label}>
        <Dropdown.Menu>
          {datasets.map(({id, name}) => (
            <Dropdown.Item as={Link} to={`/gsim/data/${id}`} content={name}/>
          ))}
        </Dropdown.Menu>
      </Dropdown>;
    }}
  </Query>
);

DataDropdown.propTypes = {};

export default DataDropdown;