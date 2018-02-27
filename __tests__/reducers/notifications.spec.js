import reducer from '../../src/reducers/notifications';
import {
  NOTIFICATION_HIDE,
  NOTIFICATION_SHOW,
} from '../../src/constants';


describe('NOTIFICATION_SHOW reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      items: [],
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it('should handle FETCH_LAYOUTS_BLOCKS_REQUEST', () => {
    expect(reducer(undefined, {
      type: NOTIFICATION_SHOW,
      payload: {
        id: 'someId',
        type: 'success',
        title: 'Test title',
        text: 'Test text',
        closeLastModal: false,
      }
    })).toMatchObject({
      items: [
        {
          closeLastModal: false,
          id: 'someId',
          text: 'Test text',
          title: 'Test title',
          type: 'success'
        }
      ],
    });
  });


  it('should handle NOTIFICATION_HIDE', () => {
    expect(reducer({
      items: [
        {
          closeLastModal: false,
          id: 'someId',
          text: 'Test text',
          title: 'Test title',
          type: 'success'
        }
      ],
    }, {
      type: NOTIFICATION_HIDE,
      payload: {
        id: 'someId',
      }
    })).toMatchObject({
      items: [],
    });
  });
});
