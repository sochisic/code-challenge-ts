import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER, UserVariables, UserData } from '../dal/gql-queries';
import { Function } from '@babel/types';

export interface ItemProps {
  user: string;
  onClick: Function;
  isActive: Boolean;
  getItemProps: any;
}

function Item({ user, onClick, isActive, getItemProps }: ItemProps) {

  return (
    <Query<UserData, UserVariables> query={GET_USER} variables={{ user }}>
      {({ loading, error, data }) => {
        if (loading) return <li className='main-item'>Loading...</li>
        if (error) return <li className='main-item' >{error.message}</li>
        if (!data) return <div>Data has not been received</div>

        const { user } = data;

        return (
          <li className={`main-item ${isActive ? 'selected' : ''}`} onClick={onClick} {...getItemProps}>
            <img height='50px' width='50px' src={user.avatarUrl} alt='User Avatar Logo' />
            <div>
              <span>{user.name}</span>
              <i>{user.company}</i>
            </div>
          </li>
        )
      }}
    </Query>
  )
}

export default Item;

