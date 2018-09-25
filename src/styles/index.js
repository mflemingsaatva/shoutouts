
import styled from 'styled-components';

export const UserProfile = styled.div`
    border: 5px solid black;
    padding: 1rem;
    width: 30%;
    float: left;

    img {
        width: 100%;
    }
`;

export const AppWrapper = styled.div`
    .dashboard,
    .profile {
        padding: 2rem;
    }
`;

export const ProfileWrapper = styled.div`
    padding: 2rem;
`;

export const ShoutoutList = styled.div`
    float: ${props => props.profile ? 'right' : 'none'};
    width: 65%;
    margin: 0 auto;

    .shoutout-list__card {
        margin: 0 auto 1rem;
        border: 5px solid black;
        padding: 1rem;
    }
`;

export const Nav = styled.nav`
    overflow: hidden;
    border-bottom: 5px solid black;
    margin-bottom: 1rem;

    a {
        float: left;
        color: black;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;

        :hover {
            background-color: #ddd;
            color: black;
        }

        &.active {
            background-color: black;
            color: white;
        }

        &.logout {
            float: right;
        }
    }x
`;
