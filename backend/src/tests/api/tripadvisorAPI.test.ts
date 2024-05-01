// write a unit test to mock the axios call and ensure that it behaves as expected.
// This involves creating a mock of axios using a testing library like jest,
// and then asserting that the function fs.writeFile is called with the correct arguments.

import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fetchDataAndWriteToFile } from '../../api/tripadvisorAPI';

jest.mock('axios');
jest.mock('fs/promises');

describe('API Test', () => {
    it('should make API call and write to file', async () => {
        const mockResponse = {data:'mocked response data'};
        const mockedAxios = axios as jest.Mocked<typeof axios>;
        const mockedFs = fs as jest.Mocked<typeof fs>;

        //mocking axios request
        mockedAxios.request.mockResolvedValue(mockResponse);

        //mocking fs.writeFile
        mockedFs.writeFile.mockResolvedValueOnce();

        //calling the function
        await fetchDataAndWriteToFile();

        //assertions
        expect(mockedAxios.request).toHaveBeenCalledWith({
            method: 'GET',
            url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails',
            params: {
              restaurantsId: 'Restaurant_Review-g304554-d8010527-Reviews-Saptami-Mumbai_Maharashtra',
              currencyCode: 'USD'
            },
            headers: {
              'X-RapidAPI-Key': 'f8662f8ed1msh343418130ebdb98p11bf57jsna9bf16098028',
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
          });
      
          expect(mockedFs.writeFile).toHaveBeenCalledWith(
            path.join(__dirname, '../../api', 'reviews.json'),
            JSON.stringify(mockResponse.data, null, 2)
          );
    });
});