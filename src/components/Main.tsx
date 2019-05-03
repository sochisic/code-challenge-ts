import React from 'react'
import Downshift from 'downshift';
import { Query } from 'react-apollo';
import Item from './Item';
import { SEARCH_USERS, UsersVariables, UsersData, Matches, TextMatches } from '../dal/gql-queries';
import { RouteChildrenProps } from 'react-router';

function Main({ history }: RouteChildrenProps) {
  return (
    <Downshift
      defaultHighlightedIndex={0}
      onChange={selectedItem => {
        history.push(selectedItem, {})
      }}>
      {({
        inputValue,
        getInputProps,
        getMenuProps,
        getItemProps,
        selectedItem,
        highlightedIndex,
        isOpen
      }) => (
          <div className='main-container'>
            <h3>Code-challenge</h3>
            <span>Let's try to find you on Github</span>
            <div>
              <input className={`main-input ${isOpen ? 'opened' : ''}`} placeholder='Start to enter name' {...getInputProps()} />
              <ul className={`main-menu ${isOpen ? 'opened' : ''}`} {...getMenuProps()}>
                {isOpen && (
                  <Query<UsersData, UsersVariables> query={SEARCH_USERS} variables={{ inputValue }}>
                    {({ loading, error, data }) => {
                      if (loading) return <li className='error'>Loading...</li>;
                      if (error) return `Error! ${error.message}`;
                      if (!data) return <div>Data has not been received</div>

                      const { search } = data;

                      const filteredOnlyLogin = search.edges.length > 0 ? search.edges.filter((it: Matches) => {
                        const loginMatches: TextMatches | undefined = it.textMatches.find((match: TextMatches) => match.property === 'login');
                        return loginMatches;
                      }) : [];

                      const getLoginsArr = filteredOnlyLogin.map((it: Matches) => {
                        const loginMatch = it.textMatches.find((match: TextMatches) => match.property === 'login');

                        return loginMatch && loginMatch.fragment;
                      })

                      return getLoginsArr.map((item: string | undefined, index: number) => <Item
                        key={item}
                        user={item}
                        getItemProps={getItemProps({ item })}
                        isActive={highlightedIndex === index}
                        isSelected={selectedItem === item}
                        {...getItemProps({
                          item,
                          index
                        })}
                      />)
                    }}
                  </Query>
                )}
              </ul>
            </div>
          </div>
        )}
    </Downshift>
  )
}

export default Main;

