import { postJSON } from '../API';

beforeEach(() => {
  fetch.resetMocks();
});

describe("Tests connecting", () => {
  test('test for getting statistics', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return postJSON('/stats')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();
      });
  });
  test('test for getting top_ranked', () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return postJSON('/top_ranked')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expect(onResponse.mock.calls[0][0]).toEqual({ id: 1 });
      });
  });
});
