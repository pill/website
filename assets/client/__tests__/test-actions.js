import * as types from '../app/actions/action-types'
import * as app_actions from '../app/actions/app'
import * as gql_actions from '../app/actions/graphql'
import * as login_actions from '../app/actions/login'


describe('actions', () => {

  it('should create an action that emits APP_INIT_COMPLETE', () => {
    const expectedAction = {
      type: types.APP_INIT_COMPLETE,
      payload: {}
    }
    expect(app_actions.appInitComplete()).toEqual(expectedAction)
  })

  it('should create an action that requests a graphqlQuery', () => {
    // query, success_action_type, error_action_type
    const q = `{post(_id:"testID"){title,body}}`
    const success = types.POST_GET_SUCCESS
    const error = types.POST_GET_ERROR
    const expectedAction = {
        type: types.GRAPHQL_QUERY,
        payload: {
            query: q,
            success_action_type: success,
            error_action_type: error
        }
    }
    expect(gql_actions.graphqlQuery(q, success, error)).toEqual(expectedAction)
  })

  it('should create an action that requests a graphqlMutation', () => {
    // query, success_action_type, error_action_type
    const mutation = `mutation myCreateMutation {
        create_post(
          post_form_data:{title:"testTitle",body:"testBody",publish_status:"testStatus"}
        )
        { post {_id,title,body,publish_status}, ok }
    }`
    const success = types.POST_GET_SUCCESS
    const error = types.POST_GET_ERROR
    const expectedAction = {
        type: types.GRAPHQL_MUTATION,
        payload: {
            query: mutation,
            success_action_type: success,
            error_action_type: error
        }
    }
    expect(gql_actions.graphqlMutation(mutation, success, error)).toEqual(expectedAction)
  })

})
