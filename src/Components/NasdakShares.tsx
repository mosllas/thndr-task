import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Define types for the response data
interface Ticker {
  ticker: string;
  name: string;
  currency_name: string;
}

interface ApiResponse {
  results: Ticker[];
  next_url: string | null; // Polygon API provides next_url for pagination
}

interface NasdakSharesProps {
  searchQuery: string; // Receive the search query as a prop
}

function NasdakShares({ searchQuery }: NasdakSharesProps) {
  const [tickers, setTickers] = useState<Ticker[]>([]); // State for storing tickers
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [nextUrl, setNextUrl] = useState<string | null>(null); // State for next URL for pagination
  const [error, setError] = useState<string | null>(null); // State for error handling

  // Fetch tickers function (handles both initial and paginated requests)
  const fetchTickers = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(url, {
        headers: {
          Authorization: `Bearer DHaOBV3RIudVL92rBphY5zNrM_xfwqLl`, // API Key for authorization
        },
      });

      const fetchedTickers = response.data.results;
      setTickers((prevTickers) => [...prevTickers, ...fetchedTickers]); // Append the new tickers to existing ones
      setNextUrl(response.data.next_url); // Update next_url for pagination
      setLoading(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      setError(`Error loading data: ${error.message}`);
    }
  }, []);

  // Fetch initial tickers only once on mount
  useEffect(() => {
    const initialUrl = "https://api.polygon.io/v3/reference/tickers?active=true&limit=10";
    fetchTickers(initialUrl);
  }, [fetchTickers]);

  // Fetch tickers based on search query
  useEffect(() => {
    if (searchQuery) {
      const searchUrl = `https://api.polygon.io/v3/reference/tickers?ticker=${searchQuery}&active=true&limit=10`;
      setTickers([]); // Clear tickers before fetching new ones
      fetchTickers(searchUrl);
    }
  }, [searchQuery, fetchTickers]);

  // Handle the infinite scroll logic
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement; // Cast target to HTMLElement
    const bottom = target.scrollHeight === target.scrollTop + target.clientHeight; // Check if the user reached the bottom

    if (bottom && !loading && nextUrl) {
      fetchTickers(nextUrl); // Use the next_url for the next page of tickers
    }
  };

  // Render the tickers or loading state
  return (
    <div
      style={{
        height: "80vh",
        overflowY: "auto",
        paddingBottom: "50px", // Give space for the loading indicator at the bottom
      }}
      onScroll={handleScroll}
    >
      <h1>Tickers</h1>

      {/* Display tickers */}
      <div className="tickers-container">
        {tickers.length === 0 && !loading && !error && <div>No tickers found</div>}

        {tickers.map((ticker, index) => (
          <div key={index} className="ticker-item" style={{ marginBottom: "10px" }}>
            <div className="ticker-symbol">{ticker.ticker}</div>
            <div className="ticker-name">{ticker.name}</div>
            <div className="currency-name">{ticker.currency_name}</div>
          </div>
        ))}
      </div>

      {/* Show loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Show error message */}
      {error && <div>{error}</div>}

      {/* Always show the "Loading More" indicator */}
      <div style={{ textAlign: "center", padding: "10px" }}>
        {loading ? (
          <div>Loading more...</div>
        ) : nextUrl ? (
          <div>Scroll down to load more</div>
        ) : (
          <div>No more data</div>
        )}
      </div>
    </div>
  );
}

export default NasdakShares;
