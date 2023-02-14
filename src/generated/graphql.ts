import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRequest: Request;
  addUser: User;
  authUser: User;
  deleteRequest: Request;
  deleteUser: User;
  updateRequest: Request;
  updateUser: User;
  verifyUser: User;
};


export type MutationAddRequestArgs = {
  createdByWho: Scalars['String'];
  department: Scalars['String'];
  timeoff: Scalars['String'];
};


export type MutationAddUserArgs = {
  admin: Scalars['Boolean'];
  approver: Scalars['Boolean'];
  classification: Scalars['Boolean'];
  department: Scalars['String'];
  email: Scalars['String'];
  fullname: Scalars['String'];
  ssn: Scalars['String'];
  timeoff: Scalars['String'];
};


export type MutationAuthUserArgs = {
  email: Scalars['String'];
  ssn: Scalars['String'];
};


export type MutationDeleteRequestArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};


export type MutationUpdateRequestArgs = {
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  admin: Scalars['Boolean'];
  approver: Scalars['Boolean'];
  classification: Scalars['Boolean'];
  department: Scalars['String'];
  fullname: Scalars['String'];
  ssn: Scalars['String'];
  timeoff: Scalars['String'];
};


export type MutationVerifyUserArgs = {
  email: Scalars['String'];
  ssn: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  requests: Array<Request>;
  users: Array<User>;
  verifiedUser: Array<User>;
};

export type Request = {
  __typename?: 'Request';
  createdByWho: Scalars['String'];
  department: Scalars['String'];
  id: Scalars['String'];
  isPending: Scalars['Boolean'];
  timeoff: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  admin: Scalars['Boolean'];
  approver: Scalars['Boolean'];
  classification: Scalars['Boolean'];
  department: Scalars['String'];
  email: Scalars['String'];
  fullname: Scalars['String'];
  ssn: Scalars['String'];
  timeoff: Scalars['String'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, ssn: string, department: string, admin: boolean, approver: boolean, fullname: string, classification: boolean, timeoff: string }> };

export type AuthUserMutationVariables = Exact<{
  email: Scalars['String'];
  ssn: Scalars['String'];
}>;


export type AuthUserMutation = { __typename?: 'Mutation', authUser: { __typename?: 'User', email: string, ssn: string, department: string, admin: boolean, approver: boolean, fullname: string, classification: boolean, timeoff: string } };

export type VerifiedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type VerifiedUserQuery = { __typename?: 'Query', verifiedUser: Array<{ __typename?: 'User', email: string, ssn: string, department: string, admin: boolean, approver: boolean, fullname: string, classification: boolean, timeoff: string }> };

export type VerifyUserMutationVariables = Exact<{
  email: Scalars['String'];
  ssn: Scalars['String'];
}>;


export type VerifyUserMutation = { __typename?: 'Mutation', verifyUser: { __typename?: 'User', email: string, ssn: string, fullname: string } };

export type UpdateUserMutationVariables = Exact<{
  department: Scalars['String'];
  ssn: Scalars['String'];
  timeoff: Scalars['String'];
  approver: Scalars['Boolean'];
  admin: Scalars['Boolean'];
  classification: Scalars['Boolean'];
  fullname: Scalars['String'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', email: string, ssn: string, department: string, admin: boolean, approver: boolean, fullname: string, classification: boolean, timeoff: string } };

export type AddUserMutationVariables = Exact<{
  department: Scalars['String'];
  ssn: Scalars['String'];
  timeoff: Scalars['String'];
  approver: Scalars['Boolean'];
  admin: Scalars['Boolean'];
  classification: Scalars['Boolean'];
  fullname: Scalars['String'];
  email: Scalars['String'];
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', email: string, ssn: string, department: string, admin: boolean, approver: boolean, fullname: string, classification: boolean, timeoff: string } };

export type DeleteUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', email: string, ssn: string, fullname: string } };

export type AddRequestMutationVariables = Exact<{
  createdByWho: Scalars['String'];
  department: Scalars['String'];
  timeoff: Scalars['String'];
}>;


export type AddRequestMutation = { __typename?: 'Mutation', addRequest: { __typename?: 'Request', department: string, createdByWho: string, isPending: boolean, id: string, timeoff: string } };

export type UpdateRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UpdateRequestMutation = { __typename?: 'Mutation', updateRequest: { __typename?: 'Request', department: string, createdByWho: string, isPending: boolean, id: string, timeoff: string } };

export type DeleteRequestMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRequestMutation = { __typename?: 'Mutation', deleteRequest: { __typename?: 'Request', department: string, createdByWho: string, isPending: boolean, id: string, timeoff: string } };

export type RequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type RequestsQuery = { __typename?: 'Query', requests: Array<{ __typename?: 'Request', department: string, createdByWho: string, isPending: boolean, id: string, timeoff: string }> };


export const GetUsersDocument = gql`
    query getUsers {
  users {
    email
    ssn
    department
    admin
    approver
    fullname
    classification
    timeoff
  }
}
    `;
export const AuthUserDocument = gql`
    mutation authUser($email: String!, $ssn: String!) {
  authUser(email: $email, ssn: $ssn) {
    email
    ssn
    department
    admin
    approver
    fullname
    classification
    timeoff
  }
}
    `;
export const VerifiedUserDocument = gql`
    query verifiedUser {
  verifiedUser {
    email
    ssn
    department
    admin
    approver
    fullname
    classification
    timeoff
  }
}
    `;
export const VerifyUserDocument = gql`
    mutation verifyUser($email: String!, $ssn: String!) {
  verifyUser(email: $email, ssn: $ssn) {
    email
    ssn
    fullname
  }
}
    `;
export const UpdateUserDocument = gql`
    mutation updateUser($department: String!, $ssn: String!, $timeoff: String!, $approver: Boolean!, $admin: Boolean!, $classification: Boolean!, $fullname: String!) {
  updateUser(
    department: $department
    ssn: $ssn
    timeoff: $timeoff
    approver: $approver
    admin: $admin
    classification: $classification
    fullname: $fullname
  ) {
    email
    ssn
    department
    admin
    approver
    fullname
    classification
    timeoff
  }
}
    `;
export const AddUserDocument = gql`
    mutation addUser($department: String!, $ssn: String!, $timeoff: String!, $approver: Boolean!, $admin: Boolean!, $classification: Boolean!, $fullname: String!, $email: String!) {
  addUser(
    department: $department
    ssn: $ssn
    timeoff: $timeoff
    approver: $approver
    admin: $admin
    classification: $classification
    fullname: $fullname
    email: $email
  ) {
    email
    ssn
    department
    admin
    approver
    fullname
    classification
    timeoff
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser($email: String!) {
  deleteUser(email: $email) {
    email
    ssn
    fullname
  }
}
    `;
export const AddRequestDocument = gql`
    mutation addRequest($createdByWho: String!, $department: String!, $timeoff: String!) {
  addRequest(
    createdByWho: $createdByWho
    department: $department
    timeoff: $timeoff
  ) {
    department
    createdByWho
    isPending
    id
    timeoff
  }
}
    `;
export const UpdateRequestDocument = gql`
    mutation updateRequest($id: String!) {
  updateRequest(id: $id) {
    department
    createdByWho
    isPending
    id
    timeoff
  }
}
    `;
export const DeleteRequestDocument = gql`
    mutation deleteRequest($id: String!) {
  deleteRequest(id: $id) {
    department
    createdByWho
    isPending
    id
    timeoff
  }
}
    `;
export const RequestsDocument = gql`
    query requests {
  requests {
    department
    createdByWho
    isPending
    id
    timeoff
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers', 'query');
    },
    authUser(variables: AuthUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthUserMutation>(AuthUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'authUser', 'mutation');
    },
    verifiedUser(variables?: VerifiedUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifiedUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifiedUserQuery>(VerifiedUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifiedUser', 'query');
    },
    verifyUser(variables: VerifyUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VerifyUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<VerifyUserMutation>(VerifyUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verifyUser', 'mutation');
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateUserMutation>(UpdateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser', 'mutation');
    },
    addUser(variables: AddUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddUserMutation>(AddUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addUser', 'mutation');
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation');
    },
    addRequest(variables: AddRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddRequestMutation>(AddRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addRequest', 'mutation');
    },
    updateRequest(variables: UpdateRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateRequestMutation>(UpdateRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateRequest', 'mutation');
    },
    deleteRequest(variables: DeleteRequestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteRequestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteRequestMutation>(DeleteRequestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteRequest', 'mutation');
    },
    requests(variables?: RequestsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RequestsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RequestsQuery>(RequestsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'requests', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;