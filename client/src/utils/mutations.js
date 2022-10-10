import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


export const ADD_CANDID = gql`
  mutation addCandid($image: String!, $productName: String!, $retailer: String!) {
    addCandid(image: $image) {
      _id
      image
      productName
      retailer
      createdAt
    }
  }
`;

export const REMOVE_CANDID = gql`
  mutation removeCandid($id: ID!) {
    removeCandid(id: $id) {
      _id
      username
      candids {
        _id
        image
      }
    }
  }
`;

export const UPLOAD_FILE = gql`
    mutation FileUpload($file: Upload!) {
        fileUpload(file: $file) {
            filename
            mimetype
            encoding
        }
    }
`;

