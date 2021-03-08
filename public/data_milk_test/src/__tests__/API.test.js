import { postJSON } from '../API';


const mockResponse = () => fetch.mockResponseOnce(JSON.stringify({
    "pos": 1,
    "id": "399857015",
    "name": "Planet Fitness Workouts",
    "released": "2010-11-04T01:40:59Z",
    "downloads": 600000,
    "revenue": 30000,
    "image": "https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/bc/82/9b/bc829bf6-6786-5872-63fc-031e650798bc/source/140x140bb.jpg",
    "rating": 3.9,
    "url": "https://apps.apple.com/us/app/id399857015",
    "rank_history": {
      "2021-01-28": 1,
      "2021-01-31": 1,
      "2021-02-01": 4,
      "2021-02-05": 2,
      "2021-02-06": 3,
      "2021-02-18": 1,
      "2021-02-20": 3,
      "2021-02-24": 1
    }
  }));

const expectResponse = (onResponse) => expect(onResponse.mock.calls[0][0]).toEqual(expect.objectContaining({
  pos: expect.any(Number),
  id: expect.any(String),
  name: expect.any(String),
  released: expect.any(String),
  downloads: expect.any(Number),
  revenue: expect.any(Number),
  image: expect.any(String),
  rating: expect.any(Number),
  url: expect.any(String),
  rank_history: expect.any(Object),
}));

beforeEach(() => {
  fetch.resetMocks();
});

describe("Tests connecting", () => {
  test('testing the structure of a request for stats', async () => {
    // fetch.mockResponseOnce(JSON.stringify({}));
    mockResponse();
    const onResponse = jest.fn();
    const onError = jest.fn();

    return postJSON('/stats')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expectResponse(onResponse);
      });
  });
  test('testing the structure of a request for top_ranked', () => {
    mockResponse();
    const onResponse = jest.fn();
    const onError = jest.fn();

    return postJSON('/top_ranked')
      .then(onResponse)
      .catch(onError)
      .finally(() => {
        expect(onResponse).toHaveBeenCalled();
        expect(onError).not.toHaveBeenCalled();

        expectResponse(onResponse);
      });
  });
});
