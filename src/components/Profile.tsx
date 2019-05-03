import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER, UserVariables, UserData } from '../dal/gql-queries';
import { RouteChildrenProps } from 'react-router';

function Profile({ location, history }: RouteChildrenProps) {
  const user = location.pathname.slice(1);

  const goGit = () => {
    window.open(`https://github.com/${user}`);
  };

  const goBack = () => {
    history.push('/')
  };

  return (
    <Query<UserData, UserVariables> query={GET_USER} variables={{ user }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error: {error.message}</div>
        if (!data) return <div>Data has not been received</div>

        const { user } = data;

        return (
          <div className='profile-container'>
            <main className='profile-content'>
              <div className='profile-close' onClick={goBack} />
              <div className='profile-image' style={{ backgroundImage: `url(${user.avatarUrl})` }} />
              <h2 className='profile-name'>{user.name}</h2>
              <span>{user.bio}</span>
              <span>{user.company}</span>
              <span>{user.location}</span>
              <div className='profile-counters-container'>
                <div className='profile-counters'>
                  <b>{user.repositories.totalCount}</b>
                  REPOS
                </div>
                <div className='profile-counters'>
                  <b>{user.gists.totalCount}</b>
                  GISTS
                </div>
                <div className='profile-counters'>
                  <b>{user.followers.totalCount}</b>
                  FOLLOWERS
                </div>
              </div>
              <div onClick={goGit} className='profile-gogit'>
                Go to Git
                <img src='/assets/github.png' alt='Github logo' />
              </div>
            </main>
          </div>
        )
      }}
    </Query>
  )
}

export default Profile;

