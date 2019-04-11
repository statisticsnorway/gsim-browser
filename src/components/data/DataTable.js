import React from 'react';
import {Get} from "react-axios";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {Header, Icon, Menu, Message, Pagination, Placeholder, Segment, Table} from "semantic-ui-react";

// TODO: Move to file.
const GET_UNIT_DATASET_STRUCTURE = gql`
    query listDatasets {
        UnitDataSet {
            edges {
                cursor
                node {

                    description {
                        languageCode
                        languageText
                    }
                    unitDataStructure {
                        logicalRecords {
                            edges {
                                node {
                                    id
                                    identifierComponents {
                                        edges {
                                            node {
                                                isUnique
                                                isComposite
                                                shortName
                                                representedVariable {
                                                    # could be abstracted?
                                                    substantiveValueDomain {
                                                        ... on DescribedValueDomain {
                                                            dataType
                                                        }
                                                        ... on EnumeratedValueDomain {
                                                            dataType
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    measureComponents {
                                        edges {
                                            node {
                                                shortName
                                                representedVariable {
                                                    substantiveValueDomain {
                                                        ... on DescribedValueDomain {
                                                            dataType
                                                        }
                                                        ... on EnumeratedValueDomain {
                                                            dataType
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    attributeComponents {
                                        edges {
                                            node {
                                                shortName
                                                representedVariable {
                                                    substantiveValueDomain {
                                                        ... on DescribedValueDomain {
                                                            dataType
                                                        }
                                                        ... on EnumeratedValueDomain {
                                                            dataType
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const DataTableHeader = ({columns: {identifiers, measures, attributes}}) => (
  <Table.Header>
    <Table.Row>
      {identifiers.map(structure => (
        <Table.HeaderCell key={structure.name} style={{color: "#0063ad"}}>
          <Icon disabled name='tag'/>{structure.name}
        </Table.HeaderCell>
      ))}
      {measures.map(structure => (
        <Table.HeaderCell key={structure.name} style={{color: "#ff5b36"}}>
          <Icon disabled name='area graph'/>{structure.name}
        </Table.HeaderCell>
      ))}
      {attributes.map(structure => (
        <Table.HeaderCell key={structure.name} style={{color: "#00ad11"}}>
          <Icon disabled name='sticky note outline'/>{structure.name}
        </Table.HeaderCell>
      ))}
    </Table.Row>
  </Table.Header>
);

const DataTableHeaderLoading = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell style={{color: "#0063ad"}}>
        <Icon disabled name='tag'/>...
      </Table.HeaderCell>
      <Table.HeaderCell style={{color: "#ff5b36"}}>
        <Icon disabled name='area graph'/>...
      </Table.HeaderCell>
      <Table.HeaderCell style={{color: "#00ad11"}}>
        <Icon disabled name='sticky note outline'/>...
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const DataTableRowsEmpty = () => (
  <Table.Body>
    <Table.Row>
      <Segment placeholder>
        <Header icon>
          <Icon name='table'/>
          This dataset is empty.
        </Header>
      </Segment>
    </Table.Row>
  </Table.Body>
);

const DataTableRowsError = ({error}) => (
  <Table.Body>
    <Table.Row>
      <Segment>
        <Message negative attached='top'>
          <Message.Header>Could not load dataset data.</Message.Header>
          <p>{error.toString()}</p>
        </Message>
      </Segment>
    </Table.Row>
  </Table.Body>
);

/**
 * A numRows by numColumns loading table.
 */
const DataTableRowsLoading = ({numRows = 5, numColumns = 3}) => (
  <Table.Body>
    {[...Array(numColumns).keys()].map(rowIdx => (
      <Table.Row key={rowIdx}>
        {[...Array(numColumns).keys()].map(colIdx => (
          <Table.Cell key={colIdx}>
            <Placeholder>
              <Placeholder.Line/>
            </Placeholder>
          </Table.Cell>
        ))}
      </Table.Row>
    ))}
  </Table.Body>
);

const DataTableRowsNormal = ({columns, data}) => {
  // Normalize columns.
  return <Table.Body>
    {data.map((datum, idx) => (
      <Table.Row key={idx}>
        {columns.map(({name, type}) => (
          <Table.Cell key={name + idx}>
            {datum[name]}
          </Table.Cell>
        ))}
      </Table.Row>
    ))}
  </Table.Body>;
};

/**
 * Wrapper for Pagination.
 *
 *
 * @param colSpan since it is inside a table, we need a colSpan.
 */
const DataTableFooter = ({onNext, onPrevious, colSpan}) => (
  <Table.Footer>
    <Table.Row>
      <Table.HeaderCell colSpan={colSpan}>
        <Menu floated='right' pagination>
          <Menu.Item as='a' icon onClick={onPrevious}>
            <Icon name='chevron left'/>
          </Menu.Item>
          {/*<Menu.Item as='a'>1</Menu.Item>*/}
          {/*<Menu.Item as='a'>2</Menu.Item>*/}
          {/*<Menu.Item as='a'>3</Menu.Item>*/}
          {/*<Menu.Item as='a'>4</Menu.Item>*/}
          <Menu.Item as='a' icon onClick={onNext}>
            <Icon name='chevron right'/>
          </Menu.Item>
        </Menu>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

/**
 * Transform the data from graphql query to a format that we can use.
 */
function normalizeColumns(data) {
  console.debug("data", data);
  const structure = data.UnitDataSet.edges[0].node.unitDataStructure.logicalRecords.edges[0].node;
  const {
    identifierComponents: identifiers,
    measureComponents: measures,
    attributeComponents: attributes
  } = structure;
  const columns = [];
  for (const {node: column} of identifiers.edges) {
    columns.push({
      role: 'identifier',
      name: column.shortName,
      type: column.representedVariable.substantiveValueDomain.dataType
    })
  }
  for (const {node: column} of measures.edges) {
    columns.push({
      role: 'measure',
      name: column.shortName,
      type: column.representedVariable.substantiveValueDomain.dataType
    })
  }
  for (const {node: column} of attributes.edges) {
    columns.push({
      role: 'attribute',
      name: column.shortName,
      type: column.representedVariable.substantiveValueDomain.dataType
    })
  }
  return {
    columns,
    identifiers: columns.filter(({role}) => role === "identifier"),
    measures: columns.filter(({role}) => role === "measure"),
    attributes: columns.filter(({role}) => role === "attribute"),
  };
}

// TODO: Rewrite using functions for headers.
const DataTable = ({datasetId, versionId}) => (
  <Table compact celled selectable>
    <Query query={GET_UNIT_DATASET_STRUCTURE}>
      {({loading, error, data}) => {
        if (loading) return <DataTableHeaderLoading/>;
        if (error) return <DataTable/>;

        const columns = normalizeColumns(data);
        return <>
          <DataTableHeader columns={columns}/>

          <Get url={`data/${datasetId}/${versionId}`} isReady={!loading} params={{size: 20, start: 0}}>
            {(error, response, loading, makeRequest) => {
              if (error) return <DataTableRowsError error={error}/>;
              if (loading || !response) return <DataTableRowsLoading numColumns={columns.columns.length}/>;
              if (response.data && !response.data) return <DataTableRowsEmpty/>;

              const {start = 0, size = 20} = response.config.params;
              console.log(response);
              return <>
                <DataTableRowsNormal columns={columns.columns} data={response.data}/>
                <DataTableFooter onPrevious={() => makeRequest({params: {start: start - size, size}})}
                                 onNext={() => makeRequest({params: {start: start + size, size}})}
                                 colSpan={columns.columns.length}/>
              </>
            }}
          </Get>
        </>
      }}
    </Query>
  </Table>
);
export default DataTable;