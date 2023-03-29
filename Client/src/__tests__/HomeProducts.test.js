import { render, screen } from '@testing-library/react';
import ProductList from "../component/ProductList/ProductList";
import { DINOSGet } from "../scripts/backend-functions";
host = "https://dinosmarketplace-urkizklnfa-wl.a.run.app";


// Define the mock implementation for DINOSGet
// const mockDINOSGet = jest.fn((url, setLoading, setData) => {
//     setLoading(true);
//     setData([
//       { userID:0, name:"Item 0", date: Date.now, price:1, description: "Description 0" }, 
//       { userID:1, name:"Item 1", date: Date.now, price:1, description: "Description 1" },
//       { userID:2, name:"Item 2", date: Date.now, price:1, description: "Description 2" },
//       { userID:3, name:"Item 3", date: Date.now, price:1, description: "Description 3" },
//       { userID:4, name:"Item 4", date: Date.now, price:1, description: "Description 4" }
//     ]);
//     setLoading(false);
//   });
  
//   // Override the original DINOSGet function with the mock implementation
//   jest.mock("../scripts/backend-functions", () => ({
//     ...jest.requireActual("../scripts/backend-functions"),
//     DINOSGet: mockDINOSGet
//   }));

// Define the test
describe('Test ProductList in Home', () => {
    let mockDINOSGet;

  beforeEach(() => {
    // Define the mock implementation for DINOSGet
    mockDINOSGet = jest.fn((url, setLoading, setData) => {
      setLoading(true);
      setData([
        { userID:0, name:"Item 0", date: Date.now, price:1, description: "Description 0" }, 
        { userID:1, name:"Item 1", date: Date.now, price:1, description: "Description 1" },
        { userID:2, name:"Item 2", date: Date.now, price:1, description: "Description 2" },
        { userID:3, name:"Item 3", date: Date.now, price:1, description: "Description 3" },
        { userID:4, name:"Item 4", date: Date.now, price:1, description: "Description 4" }
      ]);
      setLoading(false);
    });

    // Override the original DINOSGet function with the mock implementation
    jest.mock("../scripts/backend-functions", () => ({
      DINOSGet: mockDINOSGet,
      ...jest.requireActual("../scripts/backend-functions"),
    }));
  });
    it('should render products returned by the API', async () => {
    render(<ProductList />);

    // Wait for the data to be fetched and rendered
    await screen.findByText('Item 0');
    await screen.findByText('Item 1');
    await screen.findByText('Item 2');
    await screen.findByText('Item 3');
    await screen.findByText('Item 4');

    // Verify that the data is displayed correctly
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
    expect(screen.getByText('Item 24')).toBeInTheDocument();

    // Verify that the mockFetchData function was called with the correct arguments
    expect(mockFetchData).toHaveBeenCalledWith(
      `${host}/api/getAllProducts/`,
      expect.any(Function),
      expect.any(Function)
    );
  });
});